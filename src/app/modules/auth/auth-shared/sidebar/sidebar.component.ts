import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MenuGroup } from 'src/app/models/menu/menu.model';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { DeviceDetectService } from 'src/app/services/shared/device-detector.service';
import { ShareSideMenuService } from 'src/app/services/shared/share-side-menu.service';
import { SidebarService } from 'src/app/services/shared/sidebar.service';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('op', { static: true }) panel!: OverlayPanel;
  @ViewChild('elm', { static: true }) elm!: ElementRef;
  clinicId!: string
  clinicName!: string
  userId!: string


  searchedRouterLinkText: string = ''
  routerLinkFiltered: any[] = []
  routerLinksOriginal: any[] = [
    {
      text: "Add-On",
      link: "./addon",
      icon: "bi-bag-plus-fill"
    },
    {
      text: "SQL Connection",
      link: "./connection/sql-connection",
      icon: "bi-blockquote-left"
    },
    {
      text: "Storage Connection",
      link: "./connection/storage-connection",
      icon: "bi-blockquote-left"
    },
    {
      text: "Doc Activities",
      link: "./doc-ai/doc-activities",
      icon: "bi-activity"
    },
    {
      text: "Users",
      link: "./user",
      icon: "bi-people-fill"
    },
    {
      text: "User Activities",
      link: "./activities",
      icon: "bi-activity"
    }
  ]

  role!: string
  menuGroups: MenuGroup[] = []
  expand: boolean = true

  constructor(
    public authenticationService: AuthenticationService,
    private themeService: ThemeService,
    private menuService: MenuService,
    private router: Router,
    private deviceDetectService: DeviceDetectService,
    private sidebarService: SidebarService,
    private shareSideMenuService: ShareSideMenuService
  ) {
    this.clinicId = authenticationService.clinicId()
    this.userId = authenticationService.currentUserId()
  }

  ngOnInit(): void {
    this.clinicName = this.authenticationService.clinicName();
    this.role = this.authenticationService.currentUserRole();
    this.GetUserMenus()    //To get user specific menus configured in 3 User tables...
    this.onTap()
  }
  GetAvailableMenus() {
    this.menuService.GetAvailableMenus().subscribe({
      next: (res: MenuGroup[]) => { this.menuGroups = res },
      error: (err) => { }
    })
  }

  GetUserMenus() {
    this.menuService.GetUserMenus(this.clinicId, this.userId).subscribe({
      next: (res: MenuGroup[]) => {
        console.log("Menus:", res)
        this.menuGroups = res;
        this.buildSearchableRouterLinks(res)
      },
      error: (err) => { }
    })
  }

  buildSearchableRouterLinks(data: any[]) {
    var mainMenusToShare: string[] = []
    var subMenusToShar: string[] = []

    data.forEach(element => {
      var _mainMenus: any[] = element['mainMenus']
      _mainMenus.forEach(mainMenu => {
        if (mainMenu['routerLink'] != null) {
          var obj = {
            text: mainMenu['mainMenuName'],
            link: mainMenu['routerLink'],
            icon: mainMenu['icon']
          }
          this.routerLinksOriginal.push(obj)
          var _x: string[] = mainMenu['routerLink'].split('/')
          mainMenusToShare.push(_x[1].trim())
        }
        else {
          var _subMenus: any[] = mainMenu['subMenus']
          _subMenus.forEach(subMenu => {
            var obj = {
              text: subMenu['subMenuName'],
              link: subMenu['routerLink'],
              icon: subMenu['icon']
            }
            this.routerLinksOriginal.push(obj)

            var _x: string[] = subMenu['routerLink'].split('/')
            mainMenusToShare.includes(_x[1]) ? null : mainMenusToShare.push(_x[1].trim())
          });
        }
      });
    });
    this.routerLinksOriginal.sort((a, b) => {
      if (a.text < b.text) {
        return -1;
      }
      if (a.text > b.text) {
        return 1;
      }
      return 0;
    })
    localStorage.setItem("userMenus", JSON.stringify(mainMenusToShare))
    // encryptStorage.setItem("userMenus", JSON.stringify(mainMenusToShare))
    this.shareSideMenuService.setMainMenus(mainMenusToShare)
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/auth', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }
  searchRouterLink() {
    if (this.searchedRouterLinkText) {
      this.routerLinkFiltered = this.routerLinksOriginal.filter(c => c.text.toLowerCase().includes(this.searchedRouterLinkText.toLowerCase()))
      this.panel.show(null, this.elm.nativeElement)
    }
    else {
      this.routerLinkFiltered = [];
      this.panel.hide()
    }
  }
  setRouterTest(routerText: string) {
    this.searchedRouterLinkText = routerText
  }
  expandAll(): void {
    this.expand = false
    setTimeout(() => {
      this.expand = true
    }, 0);

    // this.expand = true
  }
  collapseAll(): void {
    this.expand = true
    setTimeout(() => {
      this.expand = false
    }, 0);

    // this.expand = false
  }
  onTap() {
    const _device_type: string = this.deviceDetectService.getDeviceType()
    if (_device_type == "mobile" || _device_type == "tablet") {
      setTimeout(() => { this.sidebarService.toggleSidebar(); }, 200)
    }
  }
}
