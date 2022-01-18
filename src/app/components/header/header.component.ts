import { Component, Input } from '@angular/core';
import { Translation } from 'src/app/interfaces/translation';
import { TranslationsService } from 'src/app/services/translations.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() lang: Translation;

  // lang: Translation;

  constructor(private _translationsService: TranslationsService) {
    this.lang = _translationsService.allLanguages['en'];
  }

  // initializations for the app
  ngOnInit() {
    this._translationsService.currentLang.subscribe(
      (value: Translation) => (this.lang = value)
    )
  }

  // update the language of the page
  setLang(event: any) {
    this._translationsService.setLanguage(event.target.value);
  }

  // returns true if the language given is equal to the language the page is rendered in,
  // and null otherwise
  isCurrentLang(languageCode : string) {
    return languageCode === this.lang?.name?.toLowerCase() ? true : null;
  }
}
