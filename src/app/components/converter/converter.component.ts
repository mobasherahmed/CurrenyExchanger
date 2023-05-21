import { Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { getCurrencySymbol } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable } from 'rxjs';

import { distinctUntilChanged, map, startWith, take } from 'rxjs/operators';
import { ExchangeRatesApiRequestService } from '../../shared/service/exchange-rates-api-request.service';
import { CurrencyExchangeService } from '../../shared/service/currency-exchange.service';
import {ExchangeRatesResponse,MappedCurrencyRateObject, preSelectedData} from '../../shared/interface/exchange-rates.model';
import { Currency, FormNames } from 'src/app/shared/interface/enum.model';

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ConverterComponent implements OnInit {

    @Input() details :boolean = false;
    converterForm!: FormGroup;
    filteredFromValues!: Observable<string[]>;
    filteredToValues!: Observable<string[]>;

    id: number = new Date().getTime();
    amount: number = 1;
    fromRate!: number;
    fromCurrency!: string;
    toRate!: number;
    toCurrency!: string;
    result!: string;
    mappedCurrencies: string[] = [];

    private readonly FIRST_ITEM = 0;
    data!: preSelectedData;

    constructor(
        public currencyExchangeService: CurrencyExchangeService,
        private apiRequestService: ExchangeRatesApiRequestService
    ) {}

    ngOnInit() {
        this.converterForm = this.currencyExchangeService.converterForm;
        
        this.disableInputAreas([FormNames.FromControl, FormNames.ToControl]);
        
        this.getRates();

        this.filteredFromValues = this.getFromValueChanges(FormNames.FromControl);

        this.filteredToValues = this.getToValueChanges(FormNames.ToControl);

        // @ts-ignore
        this.converterForm
            .get('amountControl')
            .valueChanges.pipe(distinctUntilChanged())
            .subscribe((amountValue: number) => {
                this.securePositiveInteger('amountControl', amountValue);
            });

        // if (this.currencyExchangeService.isServiceReferral) {
        //     this.currencyExchangeService.toggleServiceReferral();
            this.checkValidityOnLoad(this.converterForm.controls['amountControl'].value, 'amountControl');
            this.checkValidityOnLoad(this.converterForm.controls['toControl'].value, 'toControl');
            this.checkValidityOnLoad(this.converterForm.controls['fromControl'].value, 'fromControl');

            this.setFormValidity();
        // }

        
    }

    securePositiveInteger(formControlName: string, amountValue: number) {
        if (amountValue) {
            if (amountValue < 0) {
                this.converterForm.controls[formControlName].setValue(0);
            }
        }
    }

    selectCurrencyByEnter(event: MatOptionSelectionChange, inputName: string): void {
        if (event.isUserInput) {
            inputName = event.source.value;
        }
    }

    selectCurrencyByClick(selectedOption: string, formControlName: string) {
        this.converterForm.controls[formControlName].setValue(selectedOption);
        this.setFormValidity();
    }

    selectWrittenCurrency(event: any, inputName: string): void {
        const writtenCurrency = event.target.value.toUpperCase();
        this.mappedCurrencies = this.mapItemCurrencies();

        const matchedCurrency =
            this.mappedCurrencies.filter((currency) => currency.includes(writtenCurrency))[this.FIRST_ITEM] ||
            ''.toString();

        if (writtenCurrency.length === 3 && !!matchedCurrency) {
            this.converterForm.controls[inputName].setValue(matchedCurrency);
        }

        this.setFormValidity();
    }

    setFormValidity() {
        const amountControlValue = this.converterForm.controls['amountControl'].value;

        const isAmount = !!amountControlValue;

        this.currencyExchangeService.isValid =
            isAmount && this.checkForMatchedInputValue('fromControl') && this.checkForMatchedInputValue('toControl');
    }

    checkForMatchedInputValue(formControlName: string): boolean {
        const controlValue = this.converterForm.controls[formControlName].value;
        this.mappedCurrencies = this.mapItemCurrencies();

        return this.mappedCurrencies.filter((currency) => currency === controlValue.toUpperCase()).length !== 0;
    }

    checkValidityOnLoad(value: string, inputName: string) {
        const matchedCurrency =
            this.mappedCurrencies.filter((currency) => currency.includes(value))[this.FIRST_ITEM] || ''.toString();

        if (value.length === 3 && !!matchedCurrency) {
            this.converterForm.controls[inputName].setValue(matchedCurrency);
        }
    }

    exchangeRates(): void {

        this.fromRate = this.filterSelectedValue(FormNames.FromControl).rate;
        this.fromCurrency = this.filterSelectedValue(FormNames.FromControl).currency;

        this.toRate = this.filterSelectedValue(FormNames.ToControl).rate;
        this.toCurrency = this.filterSelectedValue(FormNames.ToControl).currency;

        this.amount = Math.floor(this.converterForm.get(FormNames.AmountControl)?.value);

        
        const toCurrency = this.filterSelectedValue(FormNames.ToControl).currency;
        const fromCurrency = this.filterSelectedValue(FormNames.FromControl).currency;
        const amount = Math.floor(this.converterForm.get(FormNames.AmountControl)?.value);
        
        this.data = { fromCurrency , toCurrency, amount};

        this.currencyExchangeService.preSelectedData = this.data;
        
        this.result = this.calculateExchangeRate();

        this.incrementNumberForID();

    }

    calculateExchangeRate(): string {
        return ((this.converterForm.get(FormNames.AmountControl)?.value * this.toRate) / this.fromRate).toFixed(3);
    }

    changeExchangeInputValues(): void {
        this.converterForm = new FormGroup({
            amountControl: new FormControl(this.converterForm.get(FormNames.AmountControl)?.value, [
                Validators.required,
            ]),
            fromControl: new FormControl(this.converterForm.get(FormNames.ToControl)?.value, [
                Validators.required,
                Validators.minLength(2),
            ]),
            toControl: new FormControl(this.converterForm.get(FormNames.FromControl)?.value, [
                Validators.required,
                Validators.minLength(2),
            ]),
        });

        this.incrementNumberForID();

        this.currencyExchangeService.fromCurrencies = this.mapItemCurrencies();

        this.currencyExchangeService.toCurrencies = this.mapItemCurrencies();

        this.filteredFromValues = this.getFromValueChanges(FormNames.FromControl);

        this.filteredToValues = this.getToValueChanges(FormNames.ToControl);
    }

    filterSelectedValue(value: string): MappedCurrencyRateObject {
        return this.currencyExchangeService.exchangeRates.filter((item: MappedCurrencyRateObject) => {
            return item.currency === this.converterForm.get(value)?.value;
        })[this.FIRST_ITEM];
    }

    mapItemCurrencies(): string[] {
        return this.currencyExchangeService.exchangeRates
            .map((currencyItem: MappedCurrencyRateObject) => {
                return currencyItem.currency;
            })
            .sort();
    }

    mapResponseData(responseData: ExchangeRatesResponse): MappedCurrencyRateObject[] {
        return Object.keys(responseData.rates).map(
            (item: string): MappedCurrencyRateObject => {
                return {
                    currency: item,
                    rate: responseData.rates[item],
                };
            },
        );
    }

    getFromValueChanges(stringValue: string): Observable<string[]> {
        // @ts-ignore
        return this.converterForm.get(stringValue).valueChanges.pipe(
            startWith(''),
            map((value) => this.filterInputValue(value, this.currencyExchangeService.fromCurrencies)),
        );
    }

    getToValueChanges(stringValue: string): Observable<string[]> {
      // @ts-ignore 
       return this.converterForm.get(stringValue).valueChanges.pipe(
            startWith(''),
            map((value) => this.filterInputValue(value, this.currencyExchangeService.toCurrencies)),
        );
    }


    incrementNumberForID(): number {
        return (this.id += 1);
    }

    getRates(): void {
        if (!this.currencyExchangeService.exchangeRates) {
            this.apiRequestService.getExchangeRates(Currency.USD).subscribe(
                (exchangeRate: ExchangeRatesResponse): void => {
                    this.currencyExchangeService.exchangeRates = this.mapResponseData(exchangeRate);

                    this.currencyExchangeService.fromCurrencies = this.mapItemCurrencies();

                    this.currencyExchangeService.toCurrencies = this.mapItemCurrencies();
                   
                    this.enableInputAreas(this.details ? [FormNames.ToControl] : [FormNames.FromControl, FormNames.ToControl]);
                },
                (error): void => {
                  console.log("err",error);
                },
            );
        } else {
            this.enableInputAreas(this.details ? [FormNames.ToControl] : [FormNames.FromControl, FormNames.ToControl]);
        }
    }

    disableInputAreas(inputNames: string[]): void {
        for (let inputName of inputNames) {
            this.converterForm.controls[inputName].disable();
        }
    }

    enableInputAreas(inputNames: string[]): void {
        for (let inputName of inputNames) {
            this.converterForm.controls[inputName].enable();
        }
    }

    getCurrencySymbol(code: string): string {
        return getCurrencySymbol(code, "wide");
    }

    private filterInputValue(value: string, arrayGoingFiltered: string[]): string[] {
        const filterValue = value.toLowerCase();

        return arrayGoingFiltered.filter((option) => option.toLowerCase().includes(filterValue));
    }
}

