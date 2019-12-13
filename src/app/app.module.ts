import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';
import { CommonModule } from '@angular/common';
import { IdentityManagementComponent } from './identity-management/identity-management.component';
import { HeaderComponent } from './layout/header/header.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SystemAdminComponent,
    AppComponent,
    IdentityManagementComponent,
    SystemAdminComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  providers: [],
})
export class AppModule { }
