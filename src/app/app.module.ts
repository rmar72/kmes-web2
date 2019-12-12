import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';
import { CommonModule } from '@angular/common';
import { IdentityManagementComponent } from './identity-management/identity-management.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SystemAdminComponent,
    AppComponent,
    IdentityManagementComponent,
    SystemAdminComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  providers: [],
})
export class AppModule { }
