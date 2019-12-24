import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityCreateComponent } from './identity-create.component';

describe('IdentityCreateComponent', () => {
  let component: IdentityCreateComponent;
  let fixture: ComponentFixture<IdentityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityCreateComponent ]
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
