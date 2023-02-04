import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalLoginComponent } from './global-login.component';

const routes: Routes = [
  { path: '', component: GlobalLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalLoginRoutingModule { }
