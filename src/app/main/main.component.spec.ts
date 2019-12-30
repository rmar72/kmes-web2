import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { AppModule } from '../app.module';
import { HeaderComponent } from '../layout/header/header.component';
import { SideNavComponent } from '../layout/side-nav/side-nav.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import $ from 'jquery/dist/jquery';
declare var $: any;

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MainComponent, HeaderComponent, SideNavComponent, FooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
