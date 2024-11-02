import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { AuthSharedModule } from "./auth-shared/auth-shared.module";
import { Title } from '@angular/platform-browser';


@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        AuthSharedModule
    ],
    // providers: [ShareSideMenuService,Title, DexieService ]
})
export class AuthModule { }
