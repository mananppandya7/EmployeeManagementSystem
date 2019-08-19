/*==========================================================================================
AUTHOR              :   Manan Pandya
CREATED ON          :   Aug 16, 2019
LAST MODIFIED ON    :   -
DESCRIPTION         :   Authentication Controller
============================================================================================
REVISION HISTORY : 
Name:                 Date:                 Description
============================================================================================*/

using EMS_Backend.Interface;
using EMS_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace EMS_Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        #region VARIBLES
        private IAuthenticationService _authenticationService;
        #endregion

        #region CONSTRUCTOR
        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        #endregion

        #region METHODS

        // Post: api/Authentication/LogIn
        [AllowAnonymous]
        [HttpPost("LogIn")]
        public async Task<IActionResult> Authenticate([FromBody] User user)
        {
            var result = await _authenticationService.Authenticate(user.Username, user.Password);

            if (result == null)
                return BadRequest(new { message = "Username or Password is incorrect" });

            return Ok(result);
        }

        [HttpGet]
        [Route("AuthorizeUser")]
        public async Task<IActionResult> AuthorizeUser()
        {
            return Ok(true);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("AuthorizeAdmin")]
        public async Task<IActionResult> AuthorizeAdmin()
        {
            return Ok(true);
        }

        #endregion
    }

}