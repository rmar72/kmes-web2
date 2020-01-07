import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityGroupDetailComponent } from './identity-group-detail.component';

describe('IdentityGroupDetailComponent', () => {
  let component: IdentityGroupDetailComponent;
  let fixture: ComponentFixture<IdentityGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityGroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
