import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeRatesResponse } from '../interface/exchange-rates.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesApiRequestService {

  constructor(public http: HttpClient) {}

  public getExchangeRates(baseCurrency: string): Observable<ExchangeRatesResponse> {
      return this.http.get<ExchangeRatesResponse>(`${environment.exchangeRatesAPIUrl}/latest?base=${baseCurrency}`);
  }
}
