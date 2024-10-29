import { DeveloperInfoModule } from './developer-info/developer-info.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthComponent } from './unauth.component';

const routes: Routes = [
  {
    path: '',
    component: UnauthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadChildren: () => import("./login/login.module").then(m => m.LoginModule) },
      { path: 'global-login', loadChildren: () => import("./global-login/global-login.module").then(m => m.GlobalLoginModule) },
      { path: 'register', loadChildren: () => import("./register/register.module").then(m => m.RegisterModule) },
      { path: 'contact', loadChildren: () => import("./developer-info/developer-info.module").then(m => m.DeveloperInfoModule) },
      // { path: 'email-confirmation', loadChildren: () => import("./email-confirmation/email-confirmation.module").then(m => m.EmailConfirmationModule) },
      // { path: 'forgot-password', loadChildren: () => import("./forgot-password/forgot-password.module").then(m => m.ForgotPasswordModule) },
      { path: 'reset-password', loadChildren: () => import("./reset-password/reset-password.module").then(m => m.ResetPasswordModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnauthRoutingModule { }
