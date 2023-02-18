import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/unauth/login/login.component';
//import { ToastrModule } from 'ngx-toastr';
import { ThemeService } from './theme/theme.service';
import { AuthenticationService } from './services/core/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SystemThemeService } from './theme/system-theme.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
   // ToastrModule.forRoot()
  ],
  providers: [
    ThemeService,
    AuthenticationService,
    SystemThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
