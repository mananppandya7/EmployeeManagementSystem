import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ImageWithForm } from './ImageWithForm.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-upload-type-two',
  templateUrl: './upload-type-two.component.html',
  styleUrls: ['./upload-type-two.component.css']
})
export class UploadTypeTwoComponent implements OnInit {

  //#region  VARIABLES
  imageUploadForm: FormGroup;
  selectedFile: File = null;
  imageURL: any;
  fileName: string;
  isValidFileSize = false;
  isValidFileType = false;
  errorMessage: string;
  supportedImages = ['png', 'jpg', 'jpeg'];
  //#endregion

  //#region  CONSTRUCTOR
  constructor(private documentService: DocumentService, private toastr: ToastrService) { }
  //#endregion

  //#region INIT METHODS
  ngOnInit() {
    this.fileName = 'Choose File';
  }
//#endregion

  //#region EVENTS & METHODS

  onFileSelected(event) {
    this.errorMessage = "";
    let fileType = event.target.files[0].type;
    let fileSize = event.target.files[0].size / Math.pow(1024, 2); // convert fileSize(bytes) into MB

    let fileExtension = fileType.split('/');
    let imgExtension = fileExtension[fileExtension.length - 1];

    // Validate image extension
    if (!this.supportedImages.includes(imgExtension)) {
      this.isValidFileType = true;
      this.selectedFile = null;
      this.fileName = "Choose File";
      this.errorMessage = "Image type should be .jpg | .jpeg | .png";
    }

    // Validate image size
    if (fileSize > 2) {
      this.isValidFileSize = true;
      this.selectedFile = null;
      this.fileName = "Choose File";
      this.errorMessage = "Filesize must be less than 2MB.";
    }

    // Preview image
    if (fileSize < 2 && this.supportedImages.includes(imgExtension)) {
      this.isValidFileSize = false;
      this.isValidFileType = false;

      this.selectedFile = event.target.files[0];
      this.fileName = this.selectedFile.name;

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imageURL = reader.result;
      }
    }
  }

  // SUBMIT FORM
  onSubmit(form: NgForm) {
    let firstName = form.value['firstName'];
    let lastName = form.value['lastName'];
    let imageWithForm = new ImageWithForm(0, firstName, lastName, this.selectedFile);

    this.documentService.fileUploadWithForm(imageWithForm).subscribe(response => {
      if (response) {
        this.toastr.success('Data has been saved successfully.');
        this.imageURL = null;
        this.fileName = 'Choose File';
        this.selectedFile = null;
        form.resetForm();
      } else {
        this.toastr.error('Error occured while submitting the data.');
      }
    });
  }

  // RESET FORM
  onReset(imageUploadForm: NgForm) {
    this.isValidFileSize = false;
    this.isValidFileType = false;
    this.imageURL = null;
    this.fileName = 'Choose File';
    this.selectedFile = null;
    imageUploadForm.reset();
  }

  //#endregion
}
