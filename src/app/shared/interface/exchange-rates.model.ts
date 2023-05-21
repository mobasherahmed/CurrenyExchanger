export interface StringNumberPair {
    [key: string]: number;
}

export interface SymbolsStringPair {
    [key: string]: string;
}

export interface ExchangeRatesResponse {
    base: string;
    rates: StringNumberPair;
}

export interface preSelectedData {
     fromCurrency: string; 
     toCurrency:string; 
     amount: number; 
}
export interface CurrenciesResponse {
    currency:string;
    name:string
}

export interface CurrenciesSymbolsResponse {
    symbols: SymbolsStringPair;
}

export interface MappedCurrencyRateObject {
    currency: string;
    rate: number;
}
