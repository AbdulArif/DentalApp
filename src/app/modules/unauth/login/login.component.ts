import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { FieldToggleService } from 'src/app/services/shared/field-toggle.service';
import { WindowNavigatorService } from 'src/app/services/shared/window-navigator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fieldTextType!: boolean;
  loginForm!: UntypedFormGroup;
  loginForm_loading = false;
  
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    //private toastr: ToastrService,
    public fieldToggleService: FieldToggleService,
    private windowNavigatorService: WindowNavigatorService
  ) { 
    this.buildLoginForm();
  }

  ngOnInit(): void {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/auth']);
    }
  }
  buildLoginForm() {
     this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      userAgent: [this.windowNavigatorService.userAgent, Validators.required],
      loginDateTime: null
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.loginForm_loading = true;
    if (this.loginForm.invalid) {
      this.loginForm_loading = false;
     // this.toastr.warning('Fill all the required fields!.', 'Warning', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      return;
    }
    this.loginForm.patchValue({
      loginDateTime: new Date().toISOString()
    })
    this.authenticationService.login(this.loginForm.value).pipe(first()).subscribe(
      {
        next: (data) => {
          console.log(data)
          this.loginForm_loading = false;
          this.router.navigate(['auth']);
        },
        error: (error) => {
          this.loginForm_loading = false;
         // this.toastr.error(error.error, 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        }
      }
    );
  }

  toggleFieldTextType() {
    this.fieldToggleService.toggleField();
  }

}
