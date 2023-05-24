import { TestBed } from '@angular/core/testing';

import { CacheinterceptorInterceptor } from './cacheinterceptor.interceptor';

describe('CacheinterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CacheinterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CacheinterceptorInterceptor = TestBed.inject(CacheinterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
