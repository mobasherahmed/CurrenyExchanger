import { Component, OnInit } from '@angular/core';
import {
  CurrenciesResponse,
  CurrenciesSymbolsResponse,
} from 'src/app/shared/interface/exchange-rates.model';
import { CurrencyExchangeService } from 'src/app/shared/service/currency-exchange.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-currency-deatils',
  templateUrl: './currency-deatils.component.html',
  styleUrls: ['./currency-deatils.component.scss'],
})
export class CurrencyDeatilsComponent implements OnInit {
  currenciesNames: CurrenciesResponse[] = [];
  constructor(public currencyExchangeService: CurrencyExchangeService) {}

  ngOnInit(): void {
    // this.getCuurenciesFullName();
    // this.getTimeSeies();
  }

  getCuurenciesFullName(): void {
    let myHeaders = new Headers();
    myHeaders.append('apikey', environment.API_LAYER.APIKEY);

    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    this.currencyExchangeService.loading.next(true);
    // @ts-ignore
    fetch(environment.API_LAYER.SymbolsAPIUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => this.mapResponseData(JSON.parse(result)))
      .catch((error) => console.log('error', error));
  }

  mapResponseData(responseData: CurrenciesSymbolsResponse): void {
    this.currenciesNames = Object.keys(responseData.symbols).map(
      (item: string) => {
        return {
          currency: item,
          name: responseData.symbols[item],
        };
      }
    );

    this.currencyExchangeService.loading.next(false);
  }

  get getCurrencyFullName(): string {
    if (this.currenciesNames.length > 0) {
      return this.currenciesNames.filter(
        (item) =>
          item.currency ===
          this.currencyExchangeService.preSelectedData.fromCurrency
      )[0].name;
    } 

    return '';
  }

  getTimeSeies(){
    let myHeaders = new Headers();
    myHeaders.append("apikey", environment.API_LAYER.APIKEY);

    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };
    
    const pastYear = new Date().getFullYear() - 1;

    // @ts-ignore
    fetch(`${environment.API_LAYER.TimeSeriesAPIUrl}?start_date=2023-01-01&end_date=2023-12-31&base=EUR&symbols=USD`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }
}
