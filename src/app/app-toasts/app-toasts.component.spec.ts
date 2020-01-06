import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppToastsComponent } from './app-toasts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('AppToastsComponent', () => {
  let component: AppToastsComponent;
  let fixture: ComponentFixture<AppToastsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppToastsComponent],
      imports: [NgbModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
