import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { SidebarService } from 'src/app/services/shared/sidebar.service';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  clinicName!: string;
  userId!: string
  userEmail!: string

  userName!: string
  role!: string
  theme!: string;

  imageUrl: any = "assets/user.svg";
  imageUrlSub!: Subscription

  companyLogoUrl: any = "assets/company.svg";
  companyLogoSub!: Subscription;

  constructor(
    private themeService: ThemeService,
    public sidebarService: SidebarService,
    public authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userId = this.authenticationService.currentUserId();
    this.userEmail = this.authenticationService.currentUserName();
    this.clinicName = this.authenticationService.clinicName();
  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  logOut() {
    this.authenticationService.logOut();
  }
}
