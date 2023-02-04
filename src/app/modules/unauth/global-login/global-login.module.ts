import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalLoginRoutingModule } from './global-login-routing.module';
import { GlobalLoginComponent } from './global-login.component';


@NgModule({
  declarations: [
    GlobalLoginComponent
  ],
  imports: [
    CommonModule,
    GlobalLoginRoutingModule
  ]
})
export class GlobalLoginModule { }
