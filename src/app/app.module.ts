import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/modules/material/material.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ConverterComponent } from './components/converter/converter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExchangeRatesApiRequestService } from './shared/service/exchange-rates-api-request.service';
import { CurrencyExchangeService } from './shared/service/currency-exchange.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ConvertResultCardComponent } from './components/convert-result-card/convert-result-card.component';
import { CurrencyDeatilsComponent } from './components/currency-deatils/currency-deatils.component';
import { LoaderComponent } from './core/loader.component';
import { ChartComponent } from './components/chart/chart.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    ConvertResultCardComponent,
    CurrencyDeatilsComponent,
    LoaderComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
      },
  }),
  ],
  providers: [ExchangeRatesApiRequestService, CurrencyExchangeService],
  bootstrap: [AppComponent],
  entryComponents:[LoaderComponent]
})
export class AppModule { }
