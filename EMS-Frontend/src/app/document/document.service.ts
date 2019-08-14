import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ImageWithForm } from './upload-type-two/ImageWithForm.model';
import { APIUrl } from '../common/APIUrl';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    //#region CONSTRUCTOR
    constructor(private http: HttpClient) { }
    //#endregion

    //#region METHODS

    // Single file upload
    fileUpload(file: File) {
        let formData = new FormData();

        let header = new HttpHeaders();
        header.append('Access-Control-Allow-Credentials', 'true');

        formData.append('File', file, file.name);
        return this.http.post(APIUrl.documentType1, formData, { headers: header });
    }

    // File Upload with Form
    fileUploadWithForm(fileWithForm: ImageWithForm) {
        let formData = new FormData();

        for (const prop in fileWithForm) {
            if (!fileWithForm.hasOwnProperty(prop)) { continue; }
            formData.append(prop, fileWithForm[prop]);
        }

        return this.http.post(APIUrl.documentType2, formData);
    }

    //#endregion
}