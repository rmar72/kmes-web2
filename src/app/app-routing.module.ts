import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { IdentityManagementComponent } from './identity-management/identity-management.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'identity-management',
        component: IdentityManagementComponent,
      },
      {
        path: 'system-admin',
        component: SystemAdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
