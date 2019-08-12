/*==========================================================================================
AUTHOR              :   Manan Pandya
CREATED ON          :   Aug 8, 2019
LAST MODIFIED ON    :   -
DESCRIPTION         :   Document Controller
============================================================================================
REVISION HISTORY : 
Name:                 Date:                 Description
============================================================================================*/

using EMS_Backend.Interface;
using EMS_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace EMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : Controller
    {
        #region VARIABLE DECLARATION
        private IDocumentService documentService;
        #endregion

        #region CONSTRUCTOR
        public DocumentController(IDocumentService _documentService)
        {
            documentService = _documentService;
        }
        #endregion

        #region API ENDPOINTS

        /// <summary>
        /// Get/Save File From HttpRequest
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("UploadDocumentType1")]
        public async Task<IActionResult> UploadDocumentType1()
        {
            var httpRequest = HttpContext.Request;
            var file = httpRequest.Form.Files["File"];

            var result = await documentService.UploadFile(file);

            return Ok(result);
        }

        /// <summary>
        /// Save Image with Model
        /// </summary>
        /// <param name="imageWithForm"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("UploadDocumentType2")]
        public async Task<IActionResult> UploadDocumentType2([FromForm] ImageWithForm imageWithForm)
        {
            var result = await documentService.UploadFileWithForm(imageWithForm);

            return Ok(result);
        }

        #endregion
    }
}
