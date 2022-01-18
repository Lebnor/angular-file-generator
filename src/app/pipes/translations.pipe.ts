import { Pipe, PipeTransform } from '@angular/core';
import { Translation } from '../interfaces/translation';
import { TranslationsService } from '../services/translations.service';

@Pipe({
  name: 'translations',
  pure: false,
})
export class TranslationsPipe implements PipeTransform {
  currLang: any = null;

  constructor(private _translationsService: TranslationsService) {
    this._translationsService.currentLang.subscribe((value) => {
      this.currLang = value;
    });
  }

  transform(key: string): any {
    if (this.currLang) {
      return this.currLang[key];
    }
  }
}
