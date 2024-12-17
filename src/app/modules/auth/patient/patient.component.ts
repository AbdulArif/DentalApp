import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/account/user.service';
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

  default_select!: null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private title: Title,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private patientService: PatientService,
    public tieldToggleService: FieldToggleService,
  ) {

  }

  ngOnInit(): void {
    this.title.setTitle("Patient")
    this.clinicId = this.authenticationService.clinicId()
    this.userId = this.authenticationService.currentUserId()

    this.userName = this.authenticationService.currentUserFirstName() + ' ' + this.authenticationService.currentUserLastName();
    this.GetMyPatient();
    this.items = [
      { label: 'View/Edit', icon: 'bi bi-pencil-square', command: () => this.viewPatient(this.selectedPatient) }
    ]
    this.buildCreatePatientForm();
  }
  viewPatient(patient: any): void {
    console.log("Selected user :", patient)
    this.createPatientForm.patchValue({
      userId: patient.id,
      clinicId: patient.clinicId,
      parentId: patient.parentId,
      fullName: patient.fullName,
      dateOfBirth: patient.dateOfBirth,
      countryCode: patient.countryCode,
      phoneNumber: patient.phoneNumber,
      address: patient.address,
      reasonForVisit: patient.reasonForVisit,
      patientReports: patient.patientReports,
      insuranceDetails: patient.insuranceDetails,
      medicalHistory: patient.medicalHistory,
      preferredDateAndTime: this.todaysDate.toISOString()
    })
    this.showDialog()
  }

  Patient_loading: boolean = false
  Patients: any[] = [];
  getPatientSub !: Subscription

  GetMyPatient() {
    this.Patient_loading = true
    this.getPatientSub = this.patientService.GetPatients(this.clinicId, this.userId).subscribe(
      {
        next: (response: any) => {
          console.log("Patient Details :", response)
          this.Patients = response;
          this.Patient_loading = false
        },
        error: (error: any) => {
          this.toastr.error('Patient Not Found.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
          this.Patient_loading = false
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
      dateOfBirth: ['', [Validators.required, Validators.maxLength(11)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      reasonForVisit: ['', [ Validators.maxLength(100)]],
      patientReports: ['', [ Validators.maxLength(100)]],
      insuranceDetails: ['', [ Validators.maxLength(100)]],
      dentalHistory: ['D', [ Validators.maxLength(100)]],
      medicalHistory: ['', [ Validators.maxLength(100)]],
      preferredDateAndTime: ['', [Validators.required, Validators.maxLength(11)]],
      addedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      addedDate: this.todaysDate.toISOString(),
      updatedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
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
          this.toastr.error("Failed to save user!", 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
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

}
