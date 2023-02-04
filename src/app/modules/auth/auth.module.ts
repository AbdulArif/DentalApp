import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { UnauthSharedModule } from "../unauth/unauth-shared/unauth-shared.module";
import { PrescriptionComponent } from './prescription/prescription.component';


@NgModule({
    declarations: [
        AuthComponent,
        PrescriptionComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        UnauthSharedModule
    ]
})
export class AuthModule { }
