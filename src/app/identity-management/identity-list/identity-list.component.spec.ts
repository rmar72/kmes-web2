import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityListComponent } from './identity-list.component';
import { InitialsPipe } from 'src/app/shared/pipes/initials.pipe';
import { AppModule } from 'src/app/app.module';
import { ClientApi } from 'src/app/shared/services/api/service-proxies';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IdentityListComponent', () => {
  let component: IdentityListComponent;
  let fixture: ComponentFixture<IdentityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityListComponent, InitialsPipe ],
      providers: [ ClientApi ],
      imports: [ HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
