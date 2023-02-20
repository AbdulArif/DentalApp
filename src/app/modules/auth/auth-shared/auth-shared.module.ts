import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarToggleComponent } from './sidebar-toggle/sidebar-toggle.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SidebarToggleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
   // RippleModule,
    //ButtonModule,
    //OnlineStatusModule,
    FormsModule,
    //OverlayPanelModule
  ],
  exports: [
     HeaderComponent,
     SidebarComponent,
     SidebarToggleComponent
  ]
})
export class AuthSharedModule { }
