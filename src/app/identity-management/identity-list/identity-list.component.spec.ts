import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { IdentityListComponent } from './identity-list.component';
import { InitialsPipe } from 'src/app/shared/pipes/initials.pipe';
import { UsersServiceProxy, IResponseBase } from 'src/app/shared/api/service-proxies';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('IdentityListComponent', () => {
  let component: IdentityListComponent;
  let fixture: ComponentFixture<IdentityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdentityListComponent, InitialsPipe],
      providers: [UsersServiceProxy],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a user', inject(
    [HttpTestingController, UsersServiceProxy],
    (httpMock: HttpTestingController, usersService: UsersServiceProxy) => {
      const mockUsers = [
        {
          username: 'User 1',
          primaryGroup: 'Group 1',
          subGroups: ['Subgroup 1', 'Subgroup 2'],
          valid: true,
          lastLogin: '11/11/2019'
        }
      ];

      const mockResponse: IResponseBase = {
        message: 'string',
        status: 'string'
      };

      usersService.usersDelete(mockUsers[0].username).subscribe(
        response => {
          expect(response.message).toBe('string');
          expect(response.status).toBe('string');
        },
      );

      const mockReq = httpMock.expectOne(
        'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0/users?username=User%201'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('blob');
      expect(mockReq.request.method.toLowerCase()).toBe('delete');
      expect(mockReq.error).toBeTruthy();

      // mockReq.flush(new Blob([JSON.stringify('User 1')]));

      httpMock.verify();
    }
  ));
});
