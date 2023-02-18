import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/unauth/login/login.component';
//import { ToastrModule } from 'ngx-toastr';
import { ThemeService } from './theme/theme.service';
import { AuthenticationService } from './services/core/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   // ToastrModule.forRoot()
  ],
  providers: [
    ThemeService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
