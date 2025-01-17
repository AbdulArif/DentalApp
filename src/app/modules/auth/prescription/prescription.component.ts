import { UserService } from 'src/app/services/account/user.service';
import { Subscription } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { PatientService } from 'src/app/services/patient/patient-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  @ViewChild('parentdiv', { static: false }) el!: ElementRef

  clinicName!: string;
  clinicId!: string
  patientAge!: any

  patientData: any;


  constructor(
    public authenticationService: AuthenticationService,
    private userService: UserService,
    private patientService: PatientService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
    this.getCurrentUserInfo();
    this.GetMyPatient();
    this.patientData = history.state.data;
    this.patientAge  = await this.calculateAge(this.patientData.dateOfBirth)
   console.log(this.patientAge);   
  }


  userName!: string;
  userId!: string
  role!: string
  
  getCurrentUserInfo() {
    this.userName = this.authenticationService.currentUserFirstName() + ' ' + this.authenticationService.currentUserLastName();
    this.role = this.authenticationService.currentUserRole();
    this.clinicName = this.authenticationService.clinicName();
    this.clinicId = this.authenticationService.clinicId()
    this.userId = this.authenticationService.currentUserId();
  }

  patient_loading: boolean = false
  patients: any;
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
          // this.toastr.error('Patient Not Found.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
          this.patient_loading = false
        },
        complete: () => {
        }
      }
    );
  }

  calculateAge(dobString: string) {
    return new Promise((resolve, reject) => {
      try {
        // Parse the DOB string into a Date object
        const dob = new Date(dobString);

        // Check if the date is valid
        if (isNaN(dob.getTime())) {
          throw new Error("Invalid date format");
        }
        // Get the current date
        const today = new Date();
        // Calculate the difference in years
        let age = today.getFullYear() - dob.getFullYear();
        // Adjust if the current date is before the birthday in the current year
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }

        // Resolve the Promise with the calculated age
        resolve(age);
      } catch (error) {
        // Reject the Promise with an error message
        reject(error);
      }
    });
  }


downloadPdf() {
  const pdf = new jsPDF();
  var elementHTML = <HTMLElement>document.querySelector("#parentdiv");
  pdf.html(elementHTML, {
    callback: () => {
      var pageCount = pdf.internal.pages.length
      for (let i = pageCount; i >= 2; i--) {
        pdf.deletePage(i)
      }
      pdf.save("sample.pdf");
    },
    x: 0,
    y: 0,
    width: 210,
    windowWidth: elementHTML.offsetWidth
  })
}

}
