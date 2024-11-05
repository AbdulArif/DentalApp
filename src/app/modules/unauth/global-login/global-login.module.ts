import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalLoginRoutingModule } from './global-login-routing.module';
import { GlobalLoginComponent } from './global-login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GlobalLoginComponent
  ],
  imports: [
    CommonModule,
    GlobalLoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class GlobalLoginModule { }
