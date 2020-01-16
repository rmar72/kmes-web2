import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InitialsPipe } from 'src/app/shared/pipes/initials.pipe';
import { IdentityDetailComponent } from './identity-detail.component';
import { IdentityEditComponent } from '../identity-edit/identity-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { UserGroupsServiceProxy } from 'src/app/shared/api/service-proxies';

describe('IdentityDetailComponent', () => {
  let component: IdentityDetailComponent;
  let fixture: ComponentFixture<IdentityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [IdentityDetailComponent, InitialsPipe, IdentityEditComponent],
      providers: [IdentityEditComponent, UserGroupsServiceProxy]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
