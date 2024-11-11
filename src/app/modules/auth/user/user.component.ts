import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/account/account.model';
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
  clinicId!: string
  userId!: string
  userName!: string
  items!: MenuItem[];
  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Watch',
      description: 'Product Description',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      quantity: 61,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Blue Band',
      description: 'Product Description',
      image: 'blue-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: '1003',
      code: '244wgerg2',
      name: 'Blue T-Shirt',
      description: 'Product Description',
      image: 'blue-t-shirt.jpg',
      price: 29,
      category: 'Clothing',
      quantity: 25,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1004',
      code: 'h456wer53',
      name: 'Bracelet',
      description: 'Product Description',
      image: 'bracelet.jpg',
      price: 15,
      category: 'Accessories',
      quantity: 73,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1005',
      code: 'av2231fwg',
      name: 'Brown Purse',
      description: 'Product Description',
      image: 'brown-purse.jpg',
      price: 120,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: '1006',
      code: 'bib36pfvm',
      name: 'Chakra Bracelet',
      description: 'Product Description',
      image: 'chakra-bracelet.jpg',
      price: 32,
      category: 'Accessories',
      quantity: 5,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: '1007',
      code: 'mbvjkgip5',
      name: 'Galaxy Earrings',
      description: 'Product Description',
      image: 'galaxy-earrings.jpg',
      price: 34,
      category: 'Accessories',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1008',
      code: 'vbb124btr',
      name: 'Game Controller',
      description: 'Product Description',
      image: 'game-controller.jpg',
      price: 99,
      category: 'Electronics',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 4
    },
    {
      id: '1009',
      code: 'cm230f032',
      name: 'Gaming Set',
      description: 'Product Description',
      image: 'gaming-set.jpg',
      price: 299,
      category: 'Electronics',
      quantity: 63,
      inventoryStatus: 'INSTOCK',
      rating: 3
    },
    {
      id: '1010',
      code: 'plb34234v',
      name: 'Gold Phone Case',
      description: 'Product Description',
      image: 'gold-phone-case.jpg',
      price: 24,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: '1011',
      code: '4920nnc2d',
      name: 'Green Earbuds',
      description: 'Product Description',
      image: 'green-earbuds.jpg',
      price: 89,
      category: 'Electronics',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1012',
      code: '250vm23cc',
      name: 'Green T-Shirt',
      description: 'Product Description',
      image: 'green-t-shirt.jpg',
      price: 49,
      category: 'Clothing',
      quantity: 74,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1013',
      code: 'fldsmn31b',
      name: 'Grey T-Shirt',
      description: 'Product Description',
      image: 'grey-t-shirt.jpg',
      price: 48,
      category: 'Clothing',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 3
    },
    {
      id: '1014',
      code: 'waas1x2as',
      name: 'Headphones',
      description: 'Product Description',
      image: 'headphones.jpg',
      price: 175,
      category: 'Electronics',
      quantity: 8,
      inventoryStatus: 'LOWSTOCK',
      rating: 5
    },
    {
      id: '1015',
      code: 'vb34btbg5',
      name: 'Light Green T-Shirt',
      description: 'Product Description',
      image: 'light-green-t-shirt.jpg',
      price: 49,
      category: 'Clothing',
      quantity: 34,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },

  ];

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
          console.log(response)

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
          console.log(response)
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
}
