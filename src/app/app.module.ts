import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './layout/header/header.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IdentityManagementComponent } from './identity-management/identity-management.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { IdentityCreateComponent } from './identity-management/identity-create/identity-create.component';
import { IdentityGroupDetailComponent } from './identity-management/identity-group-detail/identity-group-detail.component';
import { IdentityDetailComponent } from './identity-management/identity-detail/identity-detail.component';
import { IdentityListComponent } from './identity-management/identity-list/identity-list.component';
import { ServiceProxyModule } from './shared/api/api.module';
import { InitialsPipe } from './shared/pipes/initials.pipe';
import { API_BASE_URL } from './shared/api/service-proxies';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    DashboardComponent,
    IdentityManagementComponent,
    SystemAdminComponent,
    IdentityCreateComponent,
    IdentityGroupDetailComponent,
    IdentityDetailComponent,
    IdentityListComponent,
    InitialsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceProxyModule
  ],
  bootstrap: [AppComponent],
  providers: [{provide: API_BASE_URL, useValue: environment.apiUrl}]
})
export class AppModule { }
