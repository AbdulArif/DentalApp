import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MenuGroup } from 'src/app/models/menu/menu.model';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { DeviceDetectService } from 'src/app/services/shared/device-detector.service';
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

  constructor(
    public authenticationService: AuthenticationService,
    private themeService: ThemeService,
    // private menuService: MenuService,
    private router: Router,
    private deviceDetectService: DeviceDetectService,
    private sidebarService: SidebarService,
    // private shareSideMenuService: ShareSideMenuService
  ) { 
    this.clinicId = authenticationService.companyId()
    this.userId = authenticationService.currentUserId()
  }

  ngOnInit(): void {
  }

  GetAvailableMenus() {
    // this.menuService.GetAvailableMenus().subscribe({
    //   next: (res: MenuGroup[]) => { this.menuGroups = res },
    //   error: (err) => { }
    // })
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
  expand: boolean = true
  collapseAll(): void {
    this.expand = true
    setTimeout(() => {
      this.expand = false
    }, 0);

    // this.expand = false
  }
  expandAll(): void {
    this.expand = false
    setTimeout(() => {
      this.expand = true
    }, 0);

    // this.expand = true
  }
  onTap() {
    const _device_type: string = this.deviceDetectService.getDeviceType()
    if (_device_type == "mobile" || _device_type == "tablet") {
      setTimeout(() => { this.sidebarService.toggleSidebar(); }, 200)
    }
  }
}
