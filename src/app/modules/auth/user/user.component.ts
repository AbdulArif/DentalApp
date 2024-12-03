import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/account/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { UserService } from 'src/app/services/account/user.service';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { FieldToggleService } from 'src/app/services/shared/field-toggle.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  clinicId!: string
  clinicName!: string
  userId!: string
  userName!: string
  items!: MenuItem[];

  selectedUser: any

  createUserForm!: UntypedFormGroup
  createUserForm_loading: boolean = false;
  todaysDate: Date = new Date();

  default_select!: null;

  constructor(
    private title: Title,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    public tieldToggleService: FieldToggleService,
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
    private userService: UserService,
    private menuService: MenuService,
  ) {
    this.buildCreateUserForm();
  }

  ngOnInit(): void {
    this.title.setTitle("User")
    this.clinicId = this.authenticationService.clinicId()
    this.userId = this.authenticationService.currentUserId()
    this.clinicName = this.authenticationService.clinicName()
    this.userName = this.authenticationService.currentUserFirstName() + ' ' + this.authenticationService.currentUserLastName();
    this.GetRoles();
    this.GetMyEmployees();
    this.GetAvailableMenus()
    this.items = [
      { label: 'View/Edit', icon: 'pi pi-fw pi-eye', command: () => this.viewUser(this.selectedUser) },
      // { label: 'User Authorization', icon: 'pi pi-users', command: () => this.userAuthorization(this.selectedUser) },
      // { label: 'Impersonate', icon: 'bi bi-person-bounding-box', command: () => this.impersonateUser(this.selectedUser) }
    ]
  }
  getEmployeeSub!: Subscription;
  getRolesSub!: Subscription;
  createUserSub!: Subscription;
  ngOnDestroy(): void {
    if (this.getEmployeeSub) {
      this.getEmployeeSub.unsubscribe();
    }
    if (this.getRolesSub) {
      this.getRolesSub.unsubscribe();
    }
    if (this.createUserSub) {
      this.createUserSub.unsubscribe();
    }
  }

  roles: Role[] = [];
  GetRoles(): void {
    this.getRolesSub = this.accountService.GetRoles().subscribe(
      {
        next: (response: any) => {
          console.log("Roles : ", response)

          this.roles = response;
        },
        error: (error: any) => {
          this.toastr.error('Failed to get roles.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        },
        complete: () => {
        }
      }
    );
  }
  myEmployees_loading: boolean = false
  myEmployees: any[] = [];

  GetMyEmployees() {
    this.myEmployees_loading = true
    this.getEmployeeSub = this.userService.GetMyEmployees(this.clinicId, this.userId, this.authenticationService.currentUserRole()).subscribe(
      {
        next: (response: any) => {
          console.log("GetMyEmployees result :", response)
          this.myEmployees = response;
          this.myEmployees_loading = false
        },
        error: (error: any) => {
          this.toastr.error('Failed to get my employees.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
          this.myEmployees_loading = false
        },
        complete: () => {
        }
      }
    );
  }
  GetAvailableMenus() {
    // this.menuService.GetAvailableMenus().subscribe({
    //   next: (res: any[]) => {
    //     // // console.log(res)
    //     res.forEach((menuGroup, index) => {
    //       res[index].checked = false
    //       if (menuGroup.mainMenus.length > 0) {
    //         res[index].haveSubMenuIcon = true
    //       }
    //       var _mainMenus: any[] = menuGroup.mainMenus
    //       _mainMenus.forEach((mainMenu, index_m) => {
    //         _mainMenus[index_m].checked = false
    //         if (mainMenu.subMenus.length > 0) {
    //           // // console.log(mainMenu.subMenus)
    //           _mainMenus[index_m].haveSubMenuIcon = true
    //         }
    //         var _subMenus: any[] = mainMenu.subMenus
    //         _subMenus.forEach((subMenu, index_s) => {
    //           _subMenus[index_s].checked = false
    //         });
    //       });
    //     });
    //     this.menuGroups = res;
    //     // // console.log(this.menuGroups)
    //   },
    //   error: (err) => { }
    // })
  }
  display: boolean = false
  enablePass: boolean = false
  buildCreateUserForm(): void {
    const clienturl = location.origin + "/email-confirmation"
    this.createUserForm = this.formBuilder.group({
      userId: null,
      clinicId: this.clinicId,
      parentId: this.userId,
      clinicName: this.clinicName,
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', [Validators.required, Validators.maxLength(10)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11)]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      Clienturl: clienturl,
      addedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      addedDate: this.todaysDate.toISOString(),
      updatedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      updatedDate: this.todaysDate.toISOString()
    });
  }
  get f() { return this.createUserForm.controls; }
  onSubmit(): void {
    this.createUserForm_loading = true;
    if (this.createUserForm.invalid) {
      this.createUserForm_loading = false;
      return;
    }
    console.log(this.createUserForm.value)
    this.createUserSub = this.userService.CreateUser(this.createUserForm.value, this.authenticationService.currentUserRole()).subscribe(
      {
        next: (response: any) => {
          this.createUserForm_loading = false;
          this.toastr.success(response.message, 'Success', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
          this.resetCreateUserForm()
          this.display = false
        },
        error: (error: any) => {
          this.createUserForm_loading = false;
          this.toastr.error("Failed to save user!", 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        },
        complete: () => {
          this.buildCreateUserForm();
          this.createUserForm_loading = false;
          this.GetMyEmployees()
        }
      }
    );
  }
  toggleFieldTextType() {
    this.tieldToggleService.toggleField();
  }
  resetCreateUserForm() {
    this.buildCreateUserForm();
  }
  showDialog() {
    this.display = true;
    if (this.createUserForm.get('userId')?.value) {
      this.enablePass = false
    }
    else {
      this.enablePass = true
    }
  }
  // View selected User
  viewUser(user: any) {
    this.createUserForm.patchValue({
      userId: user.employee.id,
      companyId: user.employee.companyId,
      parentId: user.employee.parentId,
      companyName: user.employee.companyName,
      firstName: user.employee.firstName,
      lastName: user.employee.lastName,
      email: user.employee.email,
      countryCode: user.employee.countryCode,
      phoneNumber: user.employee.phoneNumber,
      password: "Password@1",
      confirmPassword: "Password@1",
      role: user.roleName,
      addedBy: user.employee.addedBy,
      addedDate: user.employee.addedDate,
      updatedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      updatedDate: this.todaysDate.toISOString()
    })
    this.showDialog()
  }
}
