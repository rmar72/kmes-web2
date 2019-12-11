import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { IdentityManagementComponent } from './identity-management/identity-management.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'identity-management', component: IdentityManagementComponent },
  { path: 'system-admin', component: SystemAdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
