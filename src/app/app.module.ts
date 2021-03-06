import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslationsService } from './services/translations.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslationsPipe } from './pipes/translations.pipe';
import { APP_INITIALIZER } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    FooterComponent,
    TranslationsPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
  ],
  providers: [
    // TranslationsService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initialize,
    //   deps: [TranslationsService],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function initialize(config: TranslationsService) {
  return () => config.initialize();
}
