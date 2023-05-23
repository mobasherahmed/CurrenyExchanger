import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public languagePreference: string = StorageService.getItem('prefered-language') || 'en';

  constructor(public translate: TranslateService) {
      translate.addLangs(['en', 'ar']);

      translate.setDefaultLang(StorageService.getItem('prefered-language') || 'en');

      translate.use(StorageService.getItem('prefered-language') || 'en');

      StorageService.setItem(
          'prefered-language',
          StorageService.getItem('prefered-language') || this.languagePreference,
      );

      translate.onLangChange.subscribe(lang=>{
        if(lang.lang === 'ar'){
          document.getElementsByTagName('body')[0].setAttribute('dir','rtl');
        }else{
          document.getElementsByTagName('body')[0].setAttribute('dir','ltr');
        }

      });
  }

  changeLanguage(language: string) {
      this.languagePreference = language;

      this.translate.use(language);

      StorageService.setItem('prefered-language', language);
  }
}
