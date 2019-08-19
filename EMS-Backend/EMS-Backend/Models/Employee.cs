/*==========================================================================================
AUTHOR              :   Manan Pandya
CREATED ON          :   Aug 8, 2019
LAST MODIFIED ON    :   -
DESCRIPTION         :   Employee Model
============================================================================================
REVISION HISTORY : 
Name:                 Date:                 Description
============================================================================================*/

using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EMS_Backend.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }

        [Required(ErrorMessage = "Please enter your first name")]
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required(ErrorMessage = "Please enter your Father's Name")]
        public string FatherName { get; set; }

        [Required(ErrorMessage = "Please enter your EmailId")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter your Date of Birth")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "Please enter your Date of Joining")]
        public DateTime DateOfJoining { get; set; }

        [Required(ErrorMessage = "Please enter your Department")]
        public string Department { get; set; }

        [Required(ErrorMessage = "Please enter your Designation")]
        public string Designation { get; set; }

        [Required(ErrorMessage = "Please enter your Address")]
        public string Address { get; set; }

        [Required(ErrorMessage = "Please enter your State")]
        public string State { get; set; }

        [Required(ErrorMessage = "Please enter your City")]
        public string City { get; set; }

        [Required(ErrorMessage = "Please enter your Pin Code")]
        [RegularExpression(@"^[0-9]{6,8}$", ErrorMessage = "Invalid Zip")]
        public string Postcode { get; set; }

        [Required(ErrorMessage = "Please enter your Mobile number")]
        public double ContactNumber { get; set; }

        [Required(ErrorMessage = "Please select your Gender")]
        [RegularExpression(@"^(?:m|M|male|Male|f|F|female|Female)$", ErrorMessage = "Invalid Gender try as M/F")]
        public char Gender { get; set; }

        [Required(ErrorMessage = "Please enter your MaritalStatus")]
        public bool MaritalStatus { get; set; }

        public string Image { get; set; }

        [Required(ErrorMessage = "Please enter your Blood group")]
        public string BloodGroup { get; set; }

        [Required(ErrorMessage = "Please enter your Identity Type")]
        public string IdentityType { get; set; }

        [Required(ErrorMessage = "Please enter your Adhar/License/PAN number")]
        public string IdentityNumber { get; set; }
    }
}
