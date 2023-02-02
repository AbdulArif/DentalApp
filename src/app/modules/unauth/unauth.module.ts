import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthRoutingModule } from './unauth-routing.module';
import { UnauthComponent } from './unauth.component';


@NgModule({
  declarations: [
    UnauthComponent
  ],
  imports: [
    CommonModule,
    UnauthRoutingModule
  ]
})
export class UnauthModule { }
