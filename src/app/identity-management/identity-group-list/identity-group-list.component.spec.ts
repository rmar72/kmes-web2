import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityGroupListComponent } from './identity-group-list.component';

describe('IdentityGroupListComponent', () => {
  let component: IdentityGroupListComponent;
  let fixture: ComponentFixture<IdentityGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
