import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { AuthSharedModule } from "./auth-shared/auth-shared.module";


@NgModule({
    declarations: [
        AuthComponent,
        //PrescriptionComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        AuthSharedModule
    ]
})
export class AuthModule { }
