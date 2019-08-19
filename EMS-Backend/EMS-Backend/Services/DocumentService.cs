/*==========================================================================================
AUTHOR              :   Manan Pandya
CREATED ON          :   Aug 8, 2019
LAST MODIFIED ON    :   -
DESCRIPTION         :   Document Service
============================================================================================
REVISION HISTORY : 
Name:                 Date:                 Description
============================================================================================*/

using EMS_Backend.Interface;
using EMS_Backend.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace EMS_Backend.Services
{
    public class DocumentService : IDocumentService
    {
        #region VARIABLE DECLARATION
        private readonly EmployeeContext _context;
        #endregion

        #region CONSTRUCTOR
        public DocumentService(EmployeeContext context)
        {
            _context = context;
        }
        #endregion

        #region METHODS

        /// <summary>
        /// Save file from HttpRequest
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public async Task<bool> UploadFile(IFormFile file)
        {
            string currentDir = Environment.CurrentDirectory;
            var docType = string.Empty;

            if(file != null)
            {
                if (file.ContentType.Contains("image"))
                    docType = Path.Combine(currentDir, "Images");
                else
                    docType = Path.Combine(currentDir, "Documents");

                var filePath = Path.Combine(docType, file.FileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                    await file.CopyToAsync(fileStream);

                return true;
            }
            return false;
        }

        /// <summary>
        /// Save File with Model
        /// </summary>
        /// <param name="imageWithForm"></param>
        /// <returns></returns>
        public async Task<bool> UploadFileWithForm(ImageWithForm imageWithForm)
        {
            string currentDir = Environment.CurrentDirectory;
            var docType = Path.Combine(currentDir, "Images");

            var filePath = Path.Combine(docType, imageWithForm.ProfileImage.FileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
                await imageWithForm.ProfileImage.CopyToAsync(fileStream);

            return true;
        }

        #endregion
    }
}
