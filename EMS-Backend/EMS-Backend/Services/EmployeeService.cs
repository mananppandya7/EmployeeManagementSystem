/*==========================================================================================
AUTHOR              :   Manan Pandya
CREATED ON          :   Aug 1, 2019
LAST MODIFIED ON    :   -
DESCRIPTION         :   Employee Service
============================================================================================
REVISION HISTORY : 
Name:                 Date:                 Description
============================================================================================*/

using EMS_Backend.Models;
using EMS_Backend.Interface;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EMS_Backend.Services
{
    public class EmployeeService : IEmployeeService
    {
        #region VARIABLES
        private readonly EmployeeContext _context;
        #endregion

        #region CONSTRUCTOR
        public EmployeeService(EmployeeContext context)
        {
            _context = context;
        }
        #endregion

        #region METHODS
        // Get Employee By Id 
        public async Task<Employee> FindAsync(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        // Get All Employee
        public async Task<IList<Employee>> GetAll()
        {
            return await _context.Employees.ToListAsync();
        }

        // Add Employee
        public async Task<int> Add(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            return await _context.SaveChangesAsync();
        }

        // Modify Employee Data By Id
        public async Task Put(int id, Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        // Delete Record By Id
        public async Task<bool> Delete(Employee employee)
        {
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return true;
        }
        #endregion
    }
}
