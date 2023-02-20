import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthRoutingModule } from './unauth-routing.module';
import { UnauthComponent } from './unauth.component';
import { UnauthSharedModule } from "./unauth-shared/unauth-shared.module";


@NgModule({
    declarations: [
        UnauthComponent
    ],
    imports: [
        CommonModule,
        UnauthRoutingModule,
        UnauthSharedModule,
        ReactiveFormsModule
    ]
})
export class UnauthModule { }
