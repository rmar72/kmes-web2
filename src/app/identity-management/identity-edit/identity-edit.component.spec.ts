import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityEditComponent } from './identity-edit.component';
import { FormsModule } from '@angular/forms';
import { UsersServiceProxy } from 'src/app/shared/api/service-proxies';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IdentityEditComponent', () => {
  let component: IdentityEditComponent;
  let fixture: ComponentFixture<IdentityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ IdentityEditComponent ],
      providers: [UsersServiceProxy]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
