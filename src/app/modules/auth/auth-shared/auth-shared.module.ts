import { ButtonModule } from 'primeng/button';
// import { DialogService } from 'primeng/dynamicdialog';
// import { RippleModule } from 'primeng/ripple';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarToggleComponent } from './sidebar-toggle/sidebar-toggle.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
// import { ConfirmationService } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SidebarToggleComponent,
    // ToDoComponent,
    // SharePointComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
   RippleModule,
    ButtonModule,
    //OnlineStatusModule,
    FormsModule,
    OverlayPanelModule
  ],
  exports: [
     HeaderComponent,
     SidebarComponent,
     SidebarToggleComponent
  ],
  // providers: [ConfirmationService, DialogService]
})
export class AuthSharedModule { }
