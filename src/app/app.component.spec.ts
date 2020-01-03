import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ConfigServiceProxy } from './shared/api/service-proxies';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppToastsComponent } from './app-toasts/app-toasts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgbModule
      ],
      declarations: [
        AppComponent,
        AppToastsComponent
      ],
      providers: [ConfigServiceProxy]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
