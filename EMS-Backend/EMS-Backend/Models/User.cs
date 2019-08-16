/*==========================================================================================
AUTHOR              :   Manan Pandya
CREATED ON          :   Aug 16, 2019
LAST MODIFIED ON    :   -
DESCRIPTION         :   Document Interface
============================================================================================
REVISION HISTORY : 
Name:                 Date:                 Description
============================================================================================*/

using EMS_Backend.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EMS_Backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public string Token { get; set; }    
    }
}
