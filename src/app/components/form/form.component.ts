import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  textRows: number = 7;
  title: string = 'file generator';
  fileContent: string = '';
  fileExtension: string = 'txt';
  isAdvanced: boolean = false;
  fileName: string = '';

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

  // downloads the file to the user's storage
  downloadFile() {
    // fileName must be set
    if (!this.fileName) {
      alert('Please enter file name');
      return;
    }

    const fullFileName: string = `${this.fileName}.${this.fileExtension}`;

    // create download element and download the file
    const link = document.createElement('a');
    link.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(this.fileContent)
    );
    link.setAttribute('download', fullFileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
