/*==========================================================================================
AUTHOR              :   Manan Pandya
CREATED ON          :   Aug 16, 2019
LAST MODIFIED ON    :   -
DESCRIPTION         :   Document Service
============================================================================================
REVISION HISTORY : 
Name:                 Date:                 Description
============================================================================================*/

using EMS_Backend.Enums;
using EMS_Backend.Interface;
using EMS_Backend.Models;
using JWT_Authentication.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EMS_Backend.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        #region VARIBLES
        //private readonly EmployeeContext _context;
        private AppSettings _appSettings;
        #endregion

        #region CONSTRUCTOR
        public AuthenticationService(IOptions<AppSettings> appSettings)
        {
            //_context = context;
            _appSettings = appSettings.Value;
        }
        #endregion

        #region METHODS

        private List<User> _users = new List<User>
        {
            new User { Id = 1, FirstName = "Admin", LastName = "User", Username = "admin@ems.com", Password = "Admin@123", Role = Role.Admin },
            new User { Id = 2, FirstName = "Manan", LastName = "Pandya", Username = "manan@ems.com", Password = "Manan@123", Role = Role.User }
        };

        // Get JWT Token by passing username and password.
        public async Task<User> Authenticate(string username, string password)
        {
            //var user = _context.Users.Where(x => x.Username == username && x.Password == password).FirstOrDefault();
            var user = _users.SingleOrDefault( x => x.Username == username && x.Password == password);

            // Return NULL if user not found.
            if (user == null)
                return null;

            // Authentication successful so generate JWT token.
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // Remove password before returning - security purpose.
            user.Password = null;

            return user;
        }

        #endregion
    }
}
