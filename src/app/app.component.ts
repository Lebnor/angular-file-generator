import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textRows : number = 7;
  title : string = 'file generator';
  fileContent : string = '';
  fileExtension : string = 'txt';
  isAdvanced : boolean = false;
  fileName : string = "";

  addRow() {
    this.textRows = this.textRows + 1;
    if (this.textRows > 16) {
      this.textRows = 16;
    }
  }
  removeRow() {
    this.textRows = this.textRows - 1;
    if (this.textRows < 4) {
      this.textRows = 4;
    }
  }
  loadRandomStory() {
    fetch("https://shortstories-api.herokuapp.com/")
    .then(response => response.json())
    .then(data => {
      this.fileContent = data.story
    })
  }
  generateFile() {
    // fileName must be set
    if (!this.fileName) {
      alert("Please enter file name");
      return;
    }

    // get data about the file
    const [fileName, fileContent, fileExtension] = [this.fileName, this.fileContent, this.fileExtension];
    const fullFileName : string = `${fileName}.${fileExtension}`;

    // create download element and download the file
    const link = document.createElement("a");
    link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent));
    link.setAttribute("download", fullFileName);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  }

  toggleAdvanced(event : MouseEvent) {
    console.log(event);
    console.log(typeof event);
    if (this.isAdvanced) {
      this.isAdvanced = false
    } else {
      // ask for confirmation
      let result = window.confirm("Warning! this is for advanced users. Are you sure you want to continue?");
      if (result) {
        this.isAdvanced = true;
      } else {
        event.preventDefault();
      }
    }
  }
}
