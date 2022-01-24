import { Injectable } from '@angular/core';
import { Translation } from '../interfaces/translation';
import { Translations } from '../interfaces/translations';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  /**
   * all languages supported
   */
  allLanguages: Translations = {};

  /**
   * the current language the page is rendered in
   */
  currentLang: Subject<Translation> = new Subject<Translation>();

  // sets the language that the page will render in
  setLanguage(languageName: string) {
    const newCurrentLang: Translation = this.allLanguages[languageName];
    this.currentLang.next(newCurrentLang);
    localStorage.setItem('language', languageName);
    localStorage.setItem('translation', JSON.stringify(newCurrentLang));
  }

  // fetching all supported languages from aws
  initialize() {
    // revisits to the page can use the cached translation
    const ls: string | null = localStorage.getItem('translation');
    if (ls && ls !== 'undefined') {
      console.log(ls);
      const obj: string | null = JSON.parse(ls as string);
      if (obj) {
        const transl: Translation = obj as unknown as Translation;
        if (transl) {
          this.currentLang.next(transl);
        }
      }
    }

    // fetch all translations from aws
    fetch(
      'https://e5lvsfi4il.execute-api.eu-west-1.amazonaws.com/default/myTranslations'
    )
      .then((response) => response.json())
      .then((data) => {
        this.allLanguages = data;
        const savedLang = localStorage.getItem('language') || 'en';
        this.currentLang.next(this.allLanguages[savedLang]);
      });
  }
  constructor(private http: HttpClient) {
    this.initialize();
  }
}
