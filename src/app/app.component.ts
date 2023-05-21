import { Component, OnInit } from '@angular/core';
import { Overlay , OverlayRef} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoaderComponent } from './core/loader.component';
import { CurrencyExchangeService } from './shared/service/currency-exchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'currency-exchanger';
  overlayRef!: OverlayRef;

  constructor(
    private overlay: Overlay,
    private currencyExchangeService: CurrencyExchangeService
  ) {}

  ngOnInit() {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });


    // New way of loader component using angular cdk overlay ...
    this.currencyExchangeService.loading.subscribe((loading) =>
      loading
        ? this.overlayRef.attach(new ComponentPortal(LoaderComponent))
        : this.overlayRef.detach()
    );
  }
}
