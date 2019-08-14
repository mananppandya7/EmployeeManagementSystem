import { Component, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../document.service';
import { APIUrl } from '../../common/APIUrl';

@Component({
  selector: 'app-upload-type-one',
  templateUrl: './upload-type-one.component.html',
  styleUrls: ['./upload-type-one.component.css']
})
export class UploadTypeOneComponent implements OnInit {

  //#region VARIABLES

  // Single file upload variables
  selectedFile: File = null;
  imageURL: any;
  fileName;
  isValidFileSize = false;
  isValidFileType = false;
  supportedImages = ['png', 'jpg', 'jpeg'];
  errorMessage;

  // Multiple files upload variables
  fileSize = 1024 * 1024 * 5;
  public uploader: FileUploader = new FileUploader({ isHTML5: true, url: APIUrl.documentType1, maxFileSize: this.fileSize, allowedFileType: ['doc', 'xls', 'text/plain', 'pdf'] });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  formData = new FormData();
  type2Validation = false;
  type2ErrorMessage;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private documentService: DocumentService, private http: HttpClient, private toastr: ToastrService) {

    this.uploader.onAfterAddingFile = (item) => {
      this.type2Validation = false;
      this.type2ErrorMessage = "";
    }

    this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
      this.type2Validation = false;
      this.type2ErrorMessage = "";

      // Convert File sise in MB & validate it.
      let type2FileSize = item.size / Math.pow(1024, 2);
      if (type2FileSize > 5) {
        this.type2Validation = true;
        this.type2ErrorMessage = "Filesize should be less than 5MB.";
      }
      else {
        this.type2Validation = true;
        this.type2ErrorMessage = `You are trying to Upload ${item.type} type of file, which is not allowed.`;
      }
    }

    this.uploader.onBuildItemForm = (item, formData) => {
      item.withCredentials = false;
      formData.append('File', item._file, item._file.name);

      this.http.post(APIUrl.documentType1, formData).subscribe(response => {

        if (response) {
          this.toastr.success('File Uploaded Successfully.');
          this.type2Validation = false;
          this.type2ErrorMessage = "";
        }
        else {
          this.toastr.error('Error occured while file uploading.');
        }

      });
    }
  }
  //#endregion

  ngOnInit() {
    this.fileName = "Choose File";
  }

  //#region EVENTS & METHODS

  onFileSelected(event) {
    let file: File = event.target.files[0];
    this.errorMessage = "";
    let fileType = file.type;
    let fileSize = file.size / Math.pow(1024, 2);

    let fileExtension = fileType.split('/');
    let imgExtension = fileExtension[fileExtension.length - 1]; // Get file extension

    // Validate file extension
    if (!this.supportedImages.includes(imgExtension)) {
      this.isValidFileType = true;
      this.selectedFile = null;
      this.fileName = "Choose File";
      this.errorMessage = "Image type should be .jpg | .jpeg | .png";
    }

    // Validate file size
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
      this.selectedFile = file;
      this.fileName = this.selectedFile.name;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imageURL = reader.result;
      }
    }
  }

  // Upload profile image
  onUploadImage() {
    this.documentService.fileUpload(this.selectedFile).subscribe(response => {
      console.log(response);
      if (response) {
        this.fileName = "Choose File";
        this.imageURL = null;
        this.selectedFile = null;
        this.toastr.success('Image uploaded successfully');
      } else {
        this.toastr.error('Error occured while uploading image');
      }
    });
  }

  // Cancel selected file
  onCancelFile() {
    this.isValidFileSize = false;
    this.isValidFileType = false;
    this.fileName = "Choose File";
    this.selectedFile = null;
  }

  // Clear Queue of uploader/ng2-file-upload
  onClearQueue() {
    this.type2Validation = false;
    this.uploader.clearQueue();
  }

  // FileOver/(drag&drop) of ng2-file-upload
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  //#endregion
}