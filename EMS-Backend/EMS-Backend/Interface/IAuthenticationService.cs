/*==========================================================================================
AUTHOR              :   Manan Pandya
CREATED ON          :   Aug 16, 2019
LAST MODIFIED ON    :   -
DESCRIPTION         :   Authentication Interface
============================================================================================
REVISION HISTORY : 
Name:                 Date:                 Description
============================================================================================*/

using EMS_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS_Backend.Interface
{
    public interface IAuthenticationService
    {
        Task<User> Authenticate(string username, string password);
    }
}
