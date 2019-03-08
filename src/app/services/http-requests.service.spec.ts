import { TestBed } from '@angular/core/testing';

import { HttpRequestsService } from './http-requests.service';

describe('HttpRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpRequestsService = TestBed.get(HttpRequestsService);
    expect(service).toBeTruthy();
  });
});
