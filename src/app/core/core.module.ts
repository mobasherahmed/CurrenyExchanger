import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageButtonsComponent } from './language-buttons/language-buttons.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LanguageButtonsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports:[HeaderComponent,LanguageButtonsComponent]
})
export class CoreModule { }
