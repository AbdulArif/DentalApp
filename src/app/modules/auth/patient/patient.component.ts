import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { PatientService } from 'src/app/services/patient/patient-service.service';
import { FieldToggleService } from 'src/app/services/shared/field-toggle.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  clinicId!: string
  userId!: string
  userName!: string
  items!: MenuItem[];
  selectedPatient!: any
  createPatientForm!: UntypedFormGroup
  createPatientForm_loading: boolean = false;
  todaysDate: Date = new Date();
  PatientId!: string

  default_select!: null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private title: Title,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private patientService: PatientService,
    public tieldToggleService: FieldToggleService,
    public router : Router,
  ) {

  }

  ngOnInit(): void {
    this.title.setTitle("Patient")
    this.clinicId = this.authenticationService.clinicId()
    this.userId = this.authenticationService.currentUserId()

    this.userName = this.authenticationService.currentUserFirstName() + ' ' + this.authenticationService.currentUserLastName();
    this.GetMyPatient();
    this.items = [
      { label: 'View/Edit', icon: 'bi bi-pencil-square', command: () => this.viewPatient(this.selectedPatient) },
      { label: 'Create Prescreption', icon: 'bi bi-prescription2', command: () => this.navigateToPrescreption(this.selectedPatient) },
      { label: 'Delete', icon: 'bi bi-trash', command: () => this.DeletePatient(this.selectedPatient) }
    ]
    this.buildCreatePatientForm();
  }


  patient_loading: boolean = false
  patients: any[] = [];
  getPatientSub !: Subscription

  GetMyPatient() {
    this.patient_loading = true
    this.getPatientSub = this.patientService.GetPatients(this.clinicId, this.userId).subscribe(
      {
        next: (response: any) => {
          console.log("Patient Details :", response)
          this.patients = response;
          this.patient_loading = false
        },
        error: (error: any) => {
          this.toastr.error('Patient Not Found.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
          this.patient_loading = false
        },
        complete: () => {
        }
      }
    );
  }

  display: boolean = false
  enablePass: boolean = false

  buildCreatePatientForm(): void {
    console.log(this.userId)
    console.log(this.clinicId)
    this.createPatientForm = this.formBuilder.group({
      patientId: null,
      clinicId: this.clinicId,
      userId: this.userId,
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      reasonForVisit: ['', [Validators.maxLength(100)]],
      // patientReports: ['', [Validators.maxLength(100)]],
      insuranceDetails: ['', [Validators.maxLength(100)]],
      dentalHistory: ['D', [Validators.maxLength(100)]],
      medicalHistory: ['', [Validators.maxLength(100)]],
      preferredDateAndTime: ['', [Validators.required]],
      addedBy: this.userName,
      addedDate: this.todaysDate.toISOString(),
      updatedBy: this.userName,
      updatedDate: this.todaysDate.toISOString()
    });
  }

  get f() { return this.createPatientForm.controls; }

  onSubmit(): void {
    this.createPatientForm_loading = true;
    if (this.createPatientForm.invalid) {
      this.createPatientForm_loading = false;
      return;
    }
    console.log(this.createPatientForm.value)
    this.getPatientSub = this.patientService.CreatePatient(this.createPatientForm.value).subscribe(
      {
        next: (response: any) => {
          this.createPatientForm_loading = false;
          this.toastr.success(response.message, 'Success', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
          this.resetCreateUserForm()
          this.display = false
        },
        error: (error: any) => {
          this.createPatientForm_loading = false;
          this.toastr.error("Failed to save patient!", 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        },
        complete: () => {
          this.buildCreatePatientForm();
          this.createPatientForm_loading = false;
          this.GetMyPatient()
        }
      }
    );
  }

  showDialog() {
    this.display = true;
    if (this.createPatientForm.get('userId')?.value) {
      this.enablePass = false
    }
    else {
      this.enablePass = true
    }
  }

  resetCreateUserForm() {
    this.buildCreatePatientForm();
  }

  toggleFieldTextType() {
    this.tieldToggleService.toggleField();
  }

  navigateToPrescreption(patient: any): void{
    // console.log("Selected user :", patient)
   this.router.navigate(['/auth/prescription'], { state: { data: patient } })
  }
  viewPatient(patient: any): void {
    console.log("Selected user :", patient)
    this.createPatientForm.patchValue({
      patientId: patient.patientId,
      userId: patient.userId,
      clinicId: patient.clinicId,
      parentId: patient.parentId,
      dentalHistory: patient.dentalHistory,
      fullName: patient.fullName,
      dateOfBirth: patient.dateOfBirth,
      phoneNumber: patient.phoneNumber,
      address: patient.address,
      reasonForVisit: patient.reasonForVisit,
      // patientReports: patient.patientReports,
      insuranceDetails: patient.insuranceDetails,
      medicalHistory: patient.medicalHistory,
      preferredDateAndTime: this.todaysDate.toISOString(),
      addedBy: patient.addedBy,
      addedDate: patient.addedDate,
      updatedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      updatedDate: this.todaysDate.toISOString()
    })
    this.showDialog()
  }


  convertToDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.type = 'date';
  }
  
  convertToText(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.value) {
      input.type = 'text';
    }
  }
  
  DeletePatient(patient:any){
    // console.log(patient)
    // this.patient_loading = true
    this.getPatientSub = this.patientService.DeletePatient(patient.patientId, this.clinicId, this.userId).subscribe(
      {
        next: (response: any) => {
          console.log("Patient Details :", response)
          // this.patient_loading = false
          this.toastr.success('Patient Delete.', 'Success', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });

          this.GetMyPatient()
        },
        error: (error: any) => {
          this.toastr.error('Patient Not Delete.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
          // this.patient_loading = false
        },
        complete: () => {
        }
      }
    );
  }

}
