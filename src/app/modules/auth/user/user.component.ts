import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
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
  userId!: string
  userName!: string
  items!: MenuItem[];

  selectedUser: any

  createUserForm!: UntypedFormGroup
  createUserForm_loading: boolean = false;
  todaysDate: Date = new Date();

  constructor(
    private title: Title,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    public tieldToggleService: FieldToggleService,
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
    private userService: UserService,
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle("User")
    this.clinicId = this.authenticationService.clinicId()
    this.userId = this.authenticationService.currentUserId()
    this.userName = this.authenticationService.currentUserFirstName() + ' ' + this.authenticationService.currentUserLastName();
    this.GetRoles();
    this.GetMyEmployees();
    this.GetAvailableMenus()
    this.items = [
      // { label: 'View/Edit', icon: 'pi pi-fw pi-eye', command: () => this.viewUser(this.selectedUser) },
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
  
  showDialog() {
    this.display = true;
    if (this.createUserForm.get('userId')?.value) {
      this.enablePass = false
    }
    else {
      this.enablePass = true
    }
  }
}
