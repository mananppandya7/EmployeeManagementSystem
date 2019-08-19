
// All api path should be declared in this file and use them in anywhere in EMS.

export class APIUrl {
    private static readonly BaseURL = 'http://localhost:54200/api/';

    //#region DOCUMENT
    public static readonly documentType1 = `${APIUrl.BaseURL}document/UploadDocumentType1`;
    public static readonly documentType2 = `${APIUrl.BaseURL}document/UploadDocumentType2`;
    //#endregion
}