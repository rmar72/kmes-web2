import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityGroupListItemComponent } from './identity-group-list-item.component';

describe('IdentityGroupListItemComponent', () => {
  let component: IdentityGroupListItemComponent;
  let fixture: ComponentFixture<IdentityGroupListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityGroupListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityGroupListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
