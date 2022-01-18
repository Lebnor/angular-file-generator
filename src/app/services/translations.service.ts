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
  allLanguages: any = {};

  /**
   * the current language the page is rendered in
   */
  currentLang: Subject<Translation> = new Subject<Translation>();

  // sets the language that the page will render in
  setLanguage(languageName: string) {
    const newCurrentLang: Translation = this.allLanguages[languageName];
    this.currentLang.next(newCurrentLang);
    localStorage.setItem('language', languageName);
  }

  initialize() {
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
  // fetching all supported languages from aws
  constructor(private http: HttpClient) {}
}
