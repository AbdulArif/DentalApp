import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/account/account.model';
import { MenuGroup } from 'src/app/models/menu/menu.model';
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
  menuGroups: any[] = []

  userMenuGroups: any[] = []
  mainMenus: any[] = []
  subMenus: any[] = []

  selectedUserName!: string


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
      { label: 'View/Edit', icon: 'bi bi-pencil-square', command: () => this.viewUser(this.selectedUser) },
      { label: 'User Authorization', icon: 'pi pi-users', command: () => this.userAuthorization(this.selectedUser) },
    ]
  }
  getEmployeeSub!: Subscription;
  getRolesSub!: Subscription;
  createUserSub!: Subscription;
  userMenuGroupsSub!: Subscription;
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
    if (this.userMenuGroupsSub) {
      this.userMenuGroupsSub.unsubscribe();
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
    console.log(this.authenticationService.currentUserRole())
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
    console.log("Selected user :", user)
    this.createUserForm.patchValue({
      userId: user.employee.id,
      clinicId: user.employee.clinicId,
      parentId: user.employee.parentId,
      clinicName: user.employee.clinicName,
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


  GetUserMenus() {
    this.userMenuGroupsSub = this.menuService.GetUserMenus(this.clinicId, this.userId).subscribe({
      next: (res: any[]) => {
        console.log("GetUserMenus :", res)
        this.userMenuGroups = res;
        if (this.userMenuGroups) {
          this.userMenuGroups.forEach(mg => {
            var _menuGroupName = mg.menuGroupName
            var omg_index = this.menuGroups.findIndex(c => c.menuGroupName == _menuGroupName)
            // omg_index >= 0 ? this.menuGroups[omg_index].checked = true : this.menuGroups[omg_index].checked = false
            if (omg_index >= 0) {
              this.menuGroups[omg_index].checked = true
              this.menuGroups[omg_index].userId = this.userId
            }
            else {
              this.menuGroups[omg_index].checked = false
            }
            var _mainMenus: any[] = mg.mainMenus
            // // console.log(omg_index)
            // // console.log(_menuGroupName)
            _mainMenus.forEach(mainMenu => {
              var _mainMenuName = mainMenu.mainMenuName
              // const mm_index = _mainMenus.findIndex(c => c.mainMenuName == _mainMenuName);/// working but have bug
              const mm_index = this.menuGroups[omg_index].mainMenus.findIndex((c: any) => c.mainMenuName == _mainMenuName);
              if (mm_index >= 0) {
                this.menuGroups[omg_index].mainMenus[mm_index].checked = true
              }
              else {
                this.menuGroups[omg_index].mainMenus[mm_index].checked = false
              }
              var _subMenus: any[] = mainMenu.subMenus
              _subMenus.forEach(subMenu => {
                var _subMenuName = subMenu.subMenuName
                const sm_index = this.menuGroups[omg_index].mainMenus[mm_index].subMenus.findIndex((c: any) => c.subMenuName == _subMenuName);
                if (sm_index >= 0) {
                  this.menuGroups[omg_index].mainMenus[mm_index].subMenus[sm_index].checked = true
                }
                else {
                  this.menuGroups[omg_index].mainMenus[mm_index].subMenus[sm_index].checked = false
                }

              });
            });
          });

        }
        else {
          console.log("else")
        }
      },
      error: (err) => { console.log(err) }
    })
  }
  //#region  User Authorization
  hideMainMenu: boolean = false;
  hideSubMenu: boolean = false;
  userAuthorizationDisplay: boolean = false;
  userAuthorization_loading: boolean = false;
  disableMainMenuCheckBox: boolean = false;
  menuGroupName: string = ""
  mainMenuName: string = ""
  disableSubMenuCheckBox: boolean = false


  userAuthorization(user: any) {
    // console.log(user)
    this.mainMenus = []
    this.subMenus = []
    this.selectedUserName = user.employee.firstName + " " + user.employee.lastName
    this.userId = user.employee.id
    // console.log(this.userId)
    this.GetUserMenus()
    this.showUserAuthorizationDialog()
  }

  showUserAuthorizationDialog() {
    this.userAuthorizationDisplay = true;
  }
  resetUserAuthorization() {
    this.userAuthorizationDisplay = false;
  }
  showMainMenus(event: any, value: any) {
    if (!value.checked) {
      this.disableMainMenuCheckBox = true
    }
    if (value.mainMenus.length == 0) {
      // console.log("No mainMenus")
    }
    else {
      // // console.log(this.mainMenuName)
      this.hideMainMenu = true
      this.menuGroupName = value.menuGroupName
      this.mainMenus = value.mainMenus;
    }
    // console.log(this.menuGroups)
    // console.log(this.mainMenus)
    // console.log(this.subMenus)
  }
  showSubMenus(event: any, value: any) {
    // // console.log(value)
    if (!value.checked) {
      this.disableSubMenuCheckBox = true
    }
    if (value.subMenus.length == 0) {
      this.hideSubMenu = false
    }
    else {
      this.hideSubMenu = true
      this.subMenus = []
      this.mainMenuName = value.mainMenuName
      this.subMenus = value.subMenus;
    }

    // // console.log(value)
  }
  hideSubMenus() {
    this.hideSubMenu = false
    this.mainMenuName = ""
    this.subMenus = []
  }
  findMainMenu(menuGroups: MenuGroup[], targetMainMenuId: string): any {
    for (const menuGroup of menuGroups) {
      const mainMenus = menuGroup.mainMenus;
      for (const mainMenu of mainMenus) {
        if (mainMenu.mainMenuId === targetMainMenuId) {
          return mainMenu;
        }
      }
    }
    return null; // Return null if mainMenuId is not found
  }
  onClickMenuGroup(event: any, value: any, index: any) {
    // console.log(event.target.checked)
    // console.log(value.menuGroupName)
    // console.log(value.menuGroupName)

    if (event.target.checked) { /// checked
      this.disableMainMenuCheckBox = false
      // console.log(value)
      // console.log(index)
      this.menuGroups[index].userId = this.userId
      this.menuGroups[index].addedBy = this.userName
      this.menuGroups[index].addedDate = new Date().toISOString();
    }
    else {  // unchecked
      this.menuGroups[index].userId = this.userId
      this.menuGroups[index].addedBy = this.userName
      this.menuGroups[index].addedDate = new Date().toISOString();
      const manageMenuGroup = this.menuGroups.find(group => group.menuGroupName === value.menuGroupName);
      if (manageMenuGroup) {
        console.log(manageMenuGroup)
        // Iterate over the mainMenus array and set the "checked" property to false
        manageMenuGroup.mainMenus.forEach((_mainMenus: any) => {
          _mainMenus.checked = false;
          // console.log(_mainMenus)
          _mainMenus.subMenus.forEach((subMenu: any) => {
            // console.log(subMenu)
            subMenu.checked = false;
          });
        });
      }
      this.mainMenus = [];
      this.subMenus = []
      this.disableMainMenuCheckBox = false
    }
    // console.log(this.menuGroups)
    // console.log(this.mainMenus)
    // console.log(this.subMenus)
  }
  hideMainMenus() {
    /// clear Main Menus & SubMenus header and also mainMenus,subMenus list not claer main menuGroups json
    this.hideMainMenu = false
    this.hideSubMenu = false
    this.menuGroupName = ""
    this.mainMenuName = ""
    this.mainMenus = []
    this.subMenus = []
  }
  onClickMainMenu(event: any, value: any, index: any) {
    console.log(value)
    console.log(index)
    console.log(this.menuGroups)
    if (event.target.checked) {
      this.disableSubMenuCheckBox = false
    }
    else {
      this.disableSubMenuCheckBox = true
      // console.log(value)
      const _mainMenu = this.findMainMenu(this.menuGroups, value.mainMenuId);
      console.log(_mainMenu);
      _mainMenu.subMenus.forEach((subMenu: any) => {
        subMenu.checked = false
      });
      this.subMenus = []
    }
    // console.log(this.menuGroups)
    // console.log(this.mainMenus)
    // console.log(this.subMenus)
  }
  onClickSubMenu(event: any, value: any) {
    // // console.log(event.target.checked)
    // // console.log(value)
  }

  GiveUserAuthorization() {
    // console.log(this.menuGroups)
    this.userAuthorization_loading = true
    this.menuService.UserAuthorization(this.menuGroups).subscribe(
      {
        next: (res: any) => {
          // // console.log(res)
          this.userAuthorization_loading = false
          this.toastr.success('User authorization saved.', 'Success', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
          this.userAuthorizationDisplay = false;
        },
        error: (error: any) => {
          this.toastr.error('Failed to save.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        },
        complete: () => { }
      }
    )
  }

  //#endregion

}
