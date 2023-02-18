import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/core/authentication.service';
import { SystemThemeService } from './theme/system-theme.service';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DentalApp';

  constructor(
    private themeService: ThemeService,
    private systemThemeService: SystemThemeService,
   // private windowNavigatorService: WindowNavigatorService,
    //public primengConfig: PrimeNGConfig,
    private authenticationService: AuthenticationService,
    private router: Router,
    //private audioService: AudioService,
  ) {
    // Enable if you want to use the user selected theme
    let _theme = localStorage.getItem("theme")!
    if (_theme) {
      this.themeService.setActiveTheme(this.themeService.availableThemes.find(t => t.name === _theme)!);
    }
    else {
      this.themeService.setActiveTheme(this.themeService.availableThemes.find(t => t.name === "light")!);
    }
    // Enable if you want to use the system theme
    // this.systemThemeService.setDarkTheme();
  }

  ngOnInit(): void {
    //this.audioService.getAudioMuteStatus();
    //this.primengConfig.ripple = true;
    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        let token = localStorage.getItem('currentUser');

        if (token == undefined || token == null) {
          // window.location.href = 'http://localhost:4200/login'
          window.location.reload();
          this.router.navigate(['/login']);
        }
      }
    }, false);
  }

  ngAfterViewInit() { }
}
