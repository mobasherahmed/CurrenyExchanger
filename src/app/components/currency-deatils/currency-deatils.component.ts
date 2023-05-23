import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  labels: string[] =[];
  values: number[] = [];
  constructor(public currencyExchangeService: CurrencyExchangeService,private route:ActivatedRoute) {
    this.currencyExchangeService.convertDone  = false;
    route.paramMap.subscribe((params:any)=> currencyExchangeService.setFormDefaultValues(params.get('from'),params.get('to'),Number(params.get('amount'))))
  }

  ngOnInit(): void {
    this.getCuurenciesFullName();
    this.getTimeSeies();
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
    this.currencyExchangeService.loading.next(true);

    let myHeaders = new Headers();
    myHeaders.append("apikey", environment.API_LAYER.APIKEY);

    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };
    
    const pastYear = new Date().getFullYear() - 1;

    const base = this.currencyExchangeService.preSelectedData.fromCurrency;
    const symbols = this.currencyExchangeService.preSelectedData.toCurrency;

    const startDate = `${pastYear}-01-01`;
    const endDate = `${pastYear}-12-31`;
    
    // @ts-ignore
    fetch(`${environment.API_LAYER.TimeSeriesAPIUrl}?start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${symbols}`, requestOptions)
    .then(response => response.text())
    .then(result => this.mapTimeSeiesResponseData(JSON.parse(result)))
    .catch(error => console.log('error', error));
  }

  mapTimeSeiesResponseData(responseData:any){
    this.labels = Object.keys(responseData.rates);
    this.values = Object.values(responseData.rates).map(
      (item:any)=>{
        return item.USD
      }
    );
    this.currencyExchangeService.loading.next(false);

  }

}
