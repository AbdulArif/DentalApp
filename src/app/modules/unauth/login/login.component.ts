import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/core/authentication.service';

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
   // public tieldToggleService: FieldToggleService,
    //private windowNavigatorService: WindowNavigatorService
  ) { }

  ngOnInit(): void {
  }

}
