import { TestBed } from '@angular/core/testing';

import { ResponsehandlingInterceptor } from './responsehandling.interceptor';

describe('ResponsehandlingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ResponsehandlingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ResponsehandlingInterceptor = TestBed.inject(ResponsehandlingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
