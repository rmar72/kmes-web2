import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityManagementComponent } from './identity-management.component';
import { InitialsPipe } from '../shared/pipes/initials.pipe';
import { UsersServiceProxy } from '../shared/api/service-proxies';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from '../login/login.component';
import { MainComponent } from '../main/main.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SystemAdminComponent } from '../system-admin/system-admin.component';
import { IdentityListComponent } from './identity-list/identity-list.component';
import { IdentityCreateComponent } from './identity-create/identity-create.component';
import { HeaderComponent } from '../layout/header/header.component';
import { SideNavComponent } from '../layout/side-nav/side-nav.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { IdentityDetailComponent } from './identity-detail/identity-detail.component';

describe('IdentityManagementComponent', () => {
  let component: IdentityManagementComponent;
  let fixture: ComponentFixture<IdentityManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AppRoutingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        IdentityManagementComponent,
        LoginComponent,
        MainComponent,
        DashboardComponent,
        SystemAdminComponent,
        IdentityListComponent,
        IdentityCreateComponent,
        HeaderComponent,
        SideNavComponent,
        FooterComponent,
        InitialsPipe,
        IdentityDetailComponent,
      ],
      providers: [UsersServiceProxy]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
