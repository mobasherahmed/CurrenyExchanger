import { ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Component, Input } from '@angular/core';
import { MappedCurrencyRateObject } from 'src/app/shared/interface/exchange-rates.model';
import { CurrencyExchangeService } from 'src/app/shared/service/currency-exchange.service';

@Component({
  selector: 'app-convert-result-card',
  templateUrl: './convert-result-card.component.html',
  styleUrls: ['./convert-result-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConvertResultCardComponent implements OnChanges {

  @Input() data:any = '';
  @Input() currency:string = '';
  amount!: number;
  toRate!: number;
  fromRate!: number;
  fromCurrency!: string;
  toCurrency!: string;
  result!: string;

  constructor(public currencyExchangeService: CurrencyExchangeService) {}

  ngOnChanges(): void {
    const {amount,fromCurrency} = this.data;
    this.fromCurrency = fromCurrency;
    this.toCurrency = this.currency;
    this.fromRate = this.filterSelectedValue(fromCurrency).rate;
    this.toRate = this.filterSelectedValue(this.currency).rate;
    this.amount = amount;
    this.result = this.calculateExchangeRate();

  }

  calculateExchangeRate(): string {
    return ((this.amount * this.toRate) / this.fromRate).toFixed(3);
}

filterSelectedValue(value: string): MappedCurrencyRateObject {
  return this.currencyExchangeService.exchangeRates.filter((item: MappedCurrencyRateObject) => {
      return item.currency === value;
  })[0]
}


}
