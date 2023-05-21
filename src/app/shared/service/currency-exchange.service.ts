import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MappedCurrencyRateObject } from '../interface/exchange-rates.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeService {
  converterForm: FormGroup = new FormGroup({
    amountControl: new FormControl('', [Validators.required]),
    fromControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    toControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  exchangeRates!: MappedCurrencyRateObject[];

  fromCurrencies: string[] = [];
  toCurrencies: string[] = [];
  mostPopularCurrencies: string[] = ['EGP','EUR','USD','GBP','SAR','KWD','JPY','RUB','UAH'];

  currentDate!: string;
  currentTime!: string;
  isValid = false;
  isServiceReferral = false;

  static toTwoDigits(givenNumber: number) {
    return givenNumber > 9 ? `${givenNumber}` : `0${givenNumber}`;
  }

  constructor() {}

  ngOnInit() {}

  getCurrentDate(separator: string): string {
    const now = new Date();

    const currentDay = now.getDate();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    this.currentDate = [currentDay, currentMonth, currentYear]
      .map(CurrencyExchangeService.toTwoDigits)
      .join(separator);

    return this.currentDate;
  }

  getCurrentTime(separator: string): string {
    const now = new Date();

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    this.currentTime = [currentHour, currentMinute, currentSecond]
      .map(CurrencyExchangeService.toTwoDigits)
      .join(separator);

    return this.currentTime;
  }

  toggleServiceReferral() {
    return (this.isServiceReferral = !this.isServiceReferral);
  }
}
