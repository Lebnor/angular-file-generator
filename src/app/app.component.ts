import { Component, Input, OnInit } from '@angular/core';
import { Translation } from './interfaces/translation';
import { TranslationsService } from './services/translations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // title of the page
  title = 'file generator';
  // language of the page, will be passed to children
  lang: Translation;

  constructor(private _currLangService: TranslationsService) {
    this.lang = _currLangService.allLanguages['en'];
  }

  ngOnInit() {
    this._currLangService.currentLang.subscribe(
      (value: Translation) => (this.lang = value)
    );

    // set initial language of the page
    this._currLangService.setLanguage(localStorage.getItem('language') || 'en');
  }
}
