import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pasajeroGuard } from './pasajero.guard';

describe('pasajeroGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pasajeroGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
