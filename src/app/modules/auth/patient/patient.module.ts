import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    TableModule,
    ContextMenuModule,
    ReactiveFormsModule,
    DialogModule,
  ]
})
export class PatientModule { }
