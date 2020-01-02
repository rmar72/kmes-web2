import { TestBed } from '@angular/core/testing';

import { IdentityMngtService } from './identity-mngt.service';

describe('IdentityMngtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentityMngtService = TestBed.get(IdentityMngtService);
    expect(service).toBeTruthy();
  });
});
