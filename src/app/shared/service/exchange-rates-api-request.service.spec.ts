import { TestBed } from '@angular/core/testing';

import { ExchangeRatesApiRequestService } from './exchange-rates-api-request.service';

describe('ExchangeRatesApiRequestService', () => {
  let service: ExchangeRatesApiRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeRatesApiRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
