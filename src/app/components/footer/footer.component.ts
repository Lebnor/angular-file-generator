import { Component, Input } from '@angular/core';
import { Translation } from 'src/app/interfaces/translation';
import { TranslationsService } from 'src/app/services/translations.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor() {}
}
