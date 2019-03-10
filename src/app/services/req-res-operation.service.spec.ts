import { TestBed } from '@angular/core/testing';

import { ReqResOperationService } from './req-res-operation.service';

describe('ReqResOperationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReqResOperationService = TestBed.get(ReqResOperationService);
    expect(service).toBeTruthy();
  });
});
