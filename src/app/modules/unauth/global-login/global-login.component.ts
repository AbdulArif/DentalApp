import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import "jspdf/dist/polyfills.es.js";
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { FieldToggleService } from 'src/app/services/shared/field-toggle.service';
import { WindowNavigatorService } from 'src/app/services/shared/window-navigator.service';


@Component({
  selector: 'app-global-login',
  templateUrl: './global-login.component.html',
  styleUrls: ['./global-login.component.scss']
})
export class GlobalLoginComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  loginForm_loading: boolean = false

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    public tieldToggleService: FieldToggleService,
    private windowNavigatorService: WindowNavigatorService
  ) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }
  get f() { return this.loginForm.controls; }

  buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      userAgent: [this.windowNavigatorService.userAgent, Validators.required],
      loginDateTime: null
    });
  }

  toggleFieldTextType() {
    this.tieldToggleService.toggleField();
  }

  onSubmit(): void {
    this.loginForm_loading = true;
    if (this.loginForm.invalid) {
      this.loginForm_loading = true;
      this.toastr.warning('Fill all the required fields!.', 'Warning', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      return;
    }
    this.loginForm.patchValue({
      loginDateTime: new Date().toISOString()
    })
    // console.log(this.loginForm.value)
    this.authenticationService.globalLogin(this.loginForm.value).pipe(first()).subscribe(
      {
        next: (data) => {
          this.loginForm_loading = false;
          this.router.navigate(['auth']);
        },
        error: (error) => {
          this.loginForm_loading = false;
          this.toastr.error(error.error, 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        }
      }
    );
  }
}
