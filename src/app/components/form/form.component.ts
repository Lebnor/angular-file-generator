import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  constructor(private sanitizer: DomSanitizer) {}

  textRows: number = 7;
  title: string = 'file generator';
  fileContent: string = '';
  fileExtension: string = 'txt';
  fileName: string = '';
  isAdvanced: boolean = false;

  // adds a row to the textarea, max is 17
  addRow() {
    this.textRows = Math.min(17, this.textRows + 1);
  }

  // removes a row from the textarea, min is 4
  removeRow() {
    this.textRows = Math.max(4, this.textRows - 1);
  }

  // populates the textarea with a random short story
  loadRandomStory() {
    fetch('https://shortstories-api.herokuapp.com/')
      .then((response) => response.json())
      .then((data) => {
        this.fileContent = data.story;
      });
  }

  // returns sanitized download link for the file being created
  sanitizedLink() : SafeHtml {
    return this.sanitizer.bypassSecurityTrustUrl(
      'data:text/plain;charset=utf-8,' + encodeURIComponent(this.fileContent)
    );
  }

  // returns the full file name of the file being created.
  // elipses the name if it's too long
  fullFileName(): string {
    return this.elipsed(this.fileName) + "." + this.fileExtension;
  }

  // truncates strings that are longer than 100 characters
  elipsed(name : string) : string {
    const maxLength = 100;
    return name.length > maxLength ? name.substring(0, maxLength - 3) + "..." : name;
  }

  // toggles wether the options are in advanced mode or not.
  // toggling ON requires confirmation
  toggleAdvanced(event: MouseEvent) {
    if (this.isAdvanced) {
      this.isAdvanced = false;
    } else {
      // ask for confirmation
      let result = window.confirm(
        'Warning! this is for advanced users. Are you sure you want to continue?'
      );
      if (result) {
        this.isAdvanced = true;
      } else {
        event.preventDefault();
      }
    }
  
  }

  
}
