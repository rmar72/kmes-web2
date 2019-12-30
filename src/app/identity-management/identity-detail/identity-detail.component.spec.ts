import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InitialsPipe } from 'src/app/shared/pipes/initials.pipe';
import { IdentityDetailComponent } from './identity-detail.component';

describe('IdentityDetailComponent', () => {
  let component: IdentityDetailComponent;
  let fixture: ComponentFixture<IdentityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityDetailComponent, InitialsPipe ]
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
