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
   * TODO: serve this data from a web server
   */
  allLanguages: Translations = {
    en: {
      name: 'English',
      dir: 'ltr',
      'header-title': 'File Generator',
      'header-subtitle': 'Create files the cool way!',
      'basic-options': 'Basic Options',
      'file-name': 'File Name:',
      'file-name-error': 'file name must be specified',
      advanced: 'advanced',
      'advanced-options': 'Advanced Options',
      'file-extension': 'File Extension',
      'load-random-story': 'Load Random Story',
      'your-content-here': 'Your content here...',
      'made-by': 'Made By Liel Ben-Or',
      download: 'download',
      "code-on" : "Code on",
      "github": "github"

    },
    he: {
      name: 'Hebrew',
      dir: 'rtl',
      'header-title': 'יוצר הקבצים',
      'header-subtitle': 'צור את הקבצים שלך בצורה מגניבה',
      'basic-options': 'אפשרויות רגילות',
      'file-name': 'שם קובץ:',
      'file-name-error': 'חסר שם קובץ',
      advanced: 'מתקדם',
      'advanced-options': 'אפשרויות מתקדמות',
      'file-extension': 'סיומת הקובץ',
      'load-random-story': 'טען סיפור קצר',
      'your-content-here': 'כתוב כאן...',
      'made-by': 'הוכן ע\" ליאל בן-אור',
      download: 'הורד את',
      "code-on" : "הקוד זמין ב",
      "github": "גיטהאב"
    },
  };

  /**
   * the current language the page is rendered in
   */
  currentLang: Subject<Translation> = new Subject<Translation>();

  // url to file containing all supported languages
  private url: string = '/assets/translations.json';

  setLanguage(languageName: string) {
    const newCurrentLang: Translation = this.allLanguages[languageName];
    this.currentLang.next(newCurrentLang);
    localStorage.setItem('language', languageName);
  }

  constructor(private http: HttpClient) {}
}
