/*==========================================================================================
AUTHOR              :   Manan Pandya
CREATED ON          :   Aug 8, 2019
LAST MODIFIED ON    :   -
DESCRIPTION         :   ImageWithForm Model
============================================================================================
REVISION HISTORY : 
Name:                 Date:                 Description
============================================================================================*/

using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace EMS_Backend.Models
{
    public class ImageWithForm
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public IFormFile ProfileImage { get; set; }
    }
}
