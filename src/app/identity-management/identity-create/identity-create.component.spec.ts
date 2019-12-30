import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { IdentityCreateComponent } from './identity-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IPersonalInfo,
  UsersPostBody,
  UsersServiceProxy,
  API_BASE_URL
} from 'src/app/shared/api/service-proxies';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('IdentityCreateComponent', () => {
  let component: IdentityCreateComponent;
  let fixture: ComponentFixture<IdentityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdentityCreateComponent],
      providers: [
        UsersServiceProxy,
        { provide: API_BASE_URL, useValue: environment.apiUrl }
      ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a user', inject(
    [HttpTestingController, UsersServiceProxy],
    (httpMock: HttpTestingController, usersService: UsersServiceProxy) => {
      const personalInfo: IPersonalInfo = {
        commonName: 'Bob',
        email: 'bob@example.com',
        firstName: 'Robert'
      };

      const baseUrl = TestBed.get(API_BASE_URL);

      const body = {
        requestData: { personalInfo: { ...personalInfo } }
      } as UsersPostBody;

      usersService.usersPost(body).subscribe(
        response => {
          console.log('success');
          console.log(response);
          console.log(response.message);
          expect(response.status).toEqual('201');
          // expect(response.message).toBe('string');
          // expect(response.status).toBe('string');
        },
        error => {
          console.log('error');
          console.log(error);
          console.log(error.status);
        }
      );

      const mockReq = httpMock.expectOne(`${baseUrl}/users`);

      // console.log('len:', mockReq.length);
      // expect(mockReq.length).toEqual(1);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toBe('blob');
      expect(mockReq.request.method.toLowerCase()).toBe('post');
      console.dir(mockReq);
      mockReq.flush(new Blob([JSON.stringify(body)]));

      httpMock.verify();
    }
  ));
});
