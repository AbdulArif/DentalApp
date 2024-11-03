import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account/account.service';
import { UserService } from 'src/app/services/account/user.service';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { FieldToggleService } from 'src/app/services/shared/field-toggle.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private title: Title,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    public tieldToggleService: FieldToggleService,
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
    private userService: UserService,
    // private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle("User")
  }

}
