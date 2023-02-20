import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperInfoRoutingModule } from './developer-info-routing.module';
import { DeveloperInfoComponent } from './developer-info.component';


@NgModule({
  declarations: [
    DeveloperInfoComponent
  ],
  imports: [
    CommonModule,
    DeveloperInfoRoutingModule
  ]
})
export class DeveloperInfoModule { }
