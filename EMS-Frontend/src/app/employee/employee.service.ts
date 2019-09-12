import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Employee } from '../models/employee';
import { DefaultService } from '../common/default.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //#region VARIABLES
  // Web API URL
  rootURL = 'http://localhost:54200/api';
  //#endregion

  //#region  CONSTRUCTOR
  constructor(private http: HttpClient, private defaultService: DefaultService) { }
  //#endregion

  //#region EVENTS & METHODS
  getAllEmployee() {
    return this.http.get<Employee[]>(`${this.rootURL}/employee`)
      .pipe(map(employee => {
        employee.forEach(element => {
          if (element.maritalStatus)
            element.maritalStatus = 'Married';
          else
            element.maritalStatus = 'Unmarried';

          element.bloodGroup = element.bloodGroup + '.png';
        });
        return employee;
      }));
  }

  getEmployeeById(employeeId: number) {
    return this.http.get<Employee>(`${this.rootURL}/employee/${employeeId}`).pipe(map(emp => {
      let dept = this.defaultService.departments.find(d => d.departmentName === emp.department);
      if (dept)
        emp.departmentId = dept.departmentId;

      // For designations dropdown list show
      this.defaultService.designations = this.defaultService.getDesignations(event, dept.departmentId.toString());

      let desig = this.defaultService.designations.find(d => d.designationName === emp.designation);
      if (desig)
        emp.designationId = desig.designationId;

      let state = this.defaultService.states.find(d => d.stateName === emp.state);
      if (state)
        emp.stateId = state.stateId;

      let identityType = this.defaultService.identitytype.find(d => d.name === emp.identityType);
      if (identityType)
        emp.identityTypeId = identityType.id;

      let bloodGroup = this.defaultService.bloodgroups.find(d => d.bloodGroupName === emp.bloodGroup);
      if (bloodGroup)
        emp.bloodGroupId = bloodGroup.bloodGroupId;

      return emp;
    }));
  }

  addEmployee(employee: Employee) {
    return this.http.post<Employee>(`${this.rootURL}/employee`, employee);
  }

  editEmployee(employeeId: number, employee: Employee) {
    return this.http.put<Employee>(`${this.rootURL}/employee/${employeeId}`, employee);
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete<Employee>(`${this.rootURL}/employee/${employeeId}`);
  }
  //#endregion
}

