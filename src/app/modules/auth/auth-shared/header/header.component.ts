import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UploadDownloadService } from 'src/app/services/account/upload-download.service';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { SidebarService } from 'src/app/services/shared/sidebar.service';
import { ThemeService } from 'src/app/theme/theme.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  screenWidth!: number

  clinicName!: string;
  clinicId!: string;
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
    public uploadDownloadService: UploadDownloadService,
    private router: Router,
    public sanitizer: DomSanitizer,
  ) {
    // this.onlineStatusSub = this.onlineStatusService.status.subscribe((status: OnlineStatusType) => { this.status = status });
  }

  ngOnInit(): void {
    this.userId = this.authenticationService.currentUserId();
    this.userEmail = this.authenticationService.currentUserName();
    this.clinicName = this.authenticationService.clinicName();
    this.clinicId = this.authenticationService.clinicId();
    this.role = this.authenticationService.currentUserRole();
    this.userName = this.authenticationService.currentUserFirstName() + ' ' + this.authenticationService.currentUserLastName();
    // $('[data-bs-toggle="tooltip"]').tooltip();
    this.getCompanyLogo();
    this.getUserprofileImage()
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 1000) {
      this.toggleSidebar()
    }
    else {
    }


  }
  ngOnDestroy() {
    // if (this.onlineStatusSub) {
    //   this.onlineStatusSub.unsubscribe();
    // }
    if (this.imageUrlSub) {
      this.imageUrlSub.unsubscribe();
    }
    if (this.companyLogoSub) {
      this.companyLogoSub.unsubscribe();
    }
  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  logOut() {
    this.authenticationService.logOut();
  }


  getUserprofileImage() {
    this.imageUrl = localStorage.getItem("userprofileImage") ? this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem("userprofileImage")!) : "assets/user.svg"
    this.imageUrlSub = this.uploadDownloadService.getBinaryImage(this.clinicId, this.userId).subscribe({
      next: (res: any) => {
        localStorage.setItem('userprofileImage', res.response);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem("userprofileImage")!);
      },
      error: (err) => {
        if (err.status == 404) {
          this.imageUrl = "assets/user.svg";
        }
      }
    })
  }

  getCompanyLogo() {
    this.companyLogoUrl = localStorage.getItem("companyLogo") ? this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem("companyLogo")!) : "assets/company.svg"
    this.companyLogoSub = this.uploadDownloadService.getBinaryclinicLogo(this.clinicId, this.authenticationService.currentUserId()).subscribe({
      next: (res: any) => {
        localStorage.setItem('companyLogo', res.response);
        this.companyLogoUrl = this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem("companyLogo")!);
      },
      error: (err) => {
        if (err.status == 404) {
          this.companyLogoUrl = "assets/company.svg";
        }
      }
    })
  }

}
