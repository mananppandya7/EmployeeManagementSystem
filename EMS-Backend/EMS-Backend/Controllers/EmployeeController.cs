/*==========================================================================================
AUTHOR              :   Manan Pandya
CREATED ON          :   Aug 1, 2019
LAST MODIFIED ON    :   -
DESCRIPTION         :   Employee Controller
============================================================================================
REVISION HISTORY : 
Name:                 Date:                 Description
============================================================================================*/

using System.Net;
using System.Threading.Tasks;
using EMS_Backend.Interface;
using EMS_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EMS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        #region VARIBLE DECLARATION
        private IEmployeeService _service;
        #endregion

        #region CONSTRUCTOR
        public EmployeeController(IEmployeeService service)
        {
            _service = service;
        }
        #endregion

        #region METHODS

        // GET: api/Employee
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        // GET: api/Employee/5
        [HttpGet("{id}", Name = "GetEmployee")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _service.FindAsync(id);
            return Ok(result);
        }

        // POST: api/Employee
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee employee)
        {
            try
            {
                await _service.Add(employee);

                return CreatedAtAction("Get", new { id = employee.EmployeeId }, employee);
            }
            catch (DbUpdateException)
            {
                if (_service.FindAsync(employee.EmployeeId) != null)
                {
                    return BadRequest();
                }
                else
                {
                    throw;
                }

            }

        }

        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }
            try
            {
                await _service.Put(id, employee);
            }
            catch (DbUpdateException)
            {
                if (_service.FindAsync(id) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var employee = await _service.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }
            var result = await _service.Delete(employee);

            return Ok(employee);
        }

        /// <summary>
        /// To get employee count by department.
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetEmployeesByDepartment")]
        public async Task<IActionResult> GetEmployeesByDepartment()
        {
            var result = await _service.GetEmployeesByDepartment();       

            return Ok(result);
        }

        #endregion
    }
}