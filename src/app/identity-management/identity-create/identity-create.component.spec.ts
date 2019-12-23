import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityCreateComponent } from './identity-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientApi } from 'src/app/shared/services/api/service-proxies';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InitialsPipe } from 'src/app/shared/pipes/initials.pipe';
import { AppModule } from 'src/app/app.module';

describe('IdentityCreateComponent', () => {
  let component: IdentityCreateComponent;
  let fixture: ComponentFixture<IdentityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ IdentityCreateComponent ],
      providers: [ ClientApi ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
