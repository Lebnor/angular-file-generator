import { Pipe, PipeTransform } from '@angular/core';
import { Translation } from '../interfaces/translation';
import { TranslationsService } from '../services/translations.service';

@Pipe({
  name: 'translations',
  pure: false,
})
export class TranslationsPipe implements PipeTransform {
  currLang: Translation;

  constructor(private _translationsService: TranslationsService) {
    this.currLang = this._translationsService.currentLang.subscribe((value) => {
      this.currLang = value;
    }) as unknown as Translation;
  }

  transform(key: string): string {
    if (this.currLang) {
      return this.currLang[key];
    }
    return "";
    // return replaceAll(key, '-', ' ');
  }
}

// Returns the capitalized version of the given string
const capitalize = (str: string): string => {
  const split: string[] = str.split(' ');
  const capitalized = split.map(
    (word) => word.charAt(0).toUpperCase + word.substring(1)
  );
  return capitalized.join('');
};

/**

 * Returns the given string where each key is replaced by value 
 * @param str the string that wants to be changed
 * @param key which character to replace
 * @param value replace value for each key
 * @returns the given string with replaced values
 */
function replaceAll(str: string, key: string, value: string): string {
  let newString: string[] = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === key) {
      newString.push(value);
    } else {
      newString.push(key);
    }
  }
  return newString.join('');
}
