import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      // { path: 'home', loadChildren: () => import("./home/home.module").then(m => m.HomeModule) },
      //{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      //{ path: 'onboarding', loadChildren: () => import("./company-onboarding/company-onboarding.module").then(m => m.CompanyOnboardingModule), data: { role: "GlobalAdmin" } },

     // { path: 'my-profile', loadChildren: () => import("./user-profile/user-profile.module").then(m => m.UserProfileModule) },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
