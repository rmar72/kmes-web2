import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/helpers/AuthGuard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { IdentityManagementComponent } from './identity-management/identity-management.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'identity-management',
        component: IdentityManagementComponent
      },
      {
        path: 'system-admin',
        component: SystemAdminComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }
    ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
