import { TestBed } from '@angular/core/testing';

import { UsersManagementService } from './users-proxy.service';

describe('UsersProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersManagementService = TestBed.get(UsersManagementService);
    expect(service).toBeTruthy();
  });
});
