import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/service/language.service';

export interface LanguageList {
  abbreviation: string;
  name: string;
  gap: string;
}

@Component({
  selector: 'app-language-buttons',
  templateUrl: './language-buttons.component.html',
  styleUrls: ['./language-buttons.component.scss']
})
export class LanguageButtonsComponent implements OnInit {

  public languages: LanguageList[] = [
    {
        abbreviation: 'en',
        name: 'English',
        gap: '',
    },
    {
        abbreviation: 'ar',
        name: 'Arabic',
        gap: 'ml-1',
    },
];

constructor(public translate: TranslateService, public languageService: LanguageService) {}

ngOnInit() {}
}
