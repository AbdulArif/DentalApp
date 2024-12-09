import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { PatientService } from 'src/app/services/patient/patient-service.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  clinicId!: string
  userId!: string
  clinicName!: string
  userName!: string

  constructor(
    private formBuilder: UntypedFormBuilder,
    private title: Title,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private patientService: PatientService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Patient")
    this.clinicId = this.authenticationService.clinicId()
    this.userId = this.authenticationService.currentUserId()
    this.clinicName = this.authenticationService.clinicName()
    this.userName = this.authenticationService.currentUserFirstName() + ' ' + this.authenticationService.currentUserLastName();
    this.GetMyPatient();
  }

  myEmployees_loading: boolean = false
  myEmployees: any[] = [];
  getPatientSub !: Subscription

  GetMyPatient() {
    this.myEmployees_loading = true
    this.getPatientSub = this.patientService.GetPatients(this.clinicId, this.userId).subscribe(
      {
        next: (response: any) => {
          console.log("Patient Details :", response)
          this.myEmployees = response;
          this.myEmployees_loading = false
        },
        error: (error: any) => {
          this.toastr.error('Patient Not Found.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
          this.myEmployees_loading = false
        },
        complete: () => {
        }
      }
    );
  }

}
