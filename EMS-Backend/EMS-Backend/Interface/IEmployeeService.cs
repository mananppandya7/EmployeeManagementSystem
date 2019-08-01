using EMS_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS_Backend.Interface
{
    public interface IEmployeeService
    {
        Task<Employee> FindAsync(int id);

        Task<IList<Employee>> GetAll();

        Task<int> Add(Employee employee);

        Task Put(int id, Employee employee);

        Task<bool> Delete(Employee employee);
    }
}
