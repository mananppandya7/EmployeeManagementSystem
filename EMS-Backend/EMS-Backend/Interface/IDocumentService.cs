/*==========================================================================================
AUTHOR              :   Manan Pandya
CREATED ON          :   Aug 8, 2019
LAST MODIFIED ON    :   -
DESCRIPTION         :   Document Interface
============================================================================================
REVISION HISTORY : 
Name:                 Date:                 Description
============================================================================================*/

using EMS_Backend.Models;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace EMS_Backend.Interface
{
    public interface IDocumentService
    {
        Task<bool> UploadFile(IFormFile file);

        Task<bool> UploadFileWithForm(ImageWithForm imageWithForm);
    }
}
