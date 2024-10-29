import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { invalid } from 'moment';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { FieldToggleService } from 'src/app/services/shared/field-toggle.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userId!: string;
  code!: string;

  resetPasswordForm!: UntypedFormGroup;
  resetPasswordForm_loading: boolean = false;
  isPasswordChanged: boolean = false;

  constructor(
    private accountService: AccountService,
    private activatedroute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    public tieldToggleService: FieldToggleService,

  ) { }

  ngOnInit(): void {
    this.getUserIdAndCode()
    this.buildResetPasswordForm()
  }

  getUserIdAndCode() {
    this.activatedroute.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.code = params['code'];
    })
  }

  get f() { return this.resetPasswordForm.controls; }

  buildResetPasswordForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      userId: this.userId,
      code: this.code,
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]]
    });
  }

  onSubmitResetPasswordForm() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.resetPasswordForm_loading = true
    this.accountService.ResetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        this.resetPasswordForm_loading = false;
        this.isPasswordChanged = true;
        this.buildResetPasswordForm()
      },
      error: (err) => {
        this.resetPasswordForm_loading = false;
      }
    });
  }


  toggleFieldTextType() {
    this.tieldToggleService.toggleField();
  }

}
