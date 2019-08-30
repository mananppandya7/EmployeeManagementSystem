import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Employee } from '../models/employee';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //#region VARIABLES
  // Web API URL
  rootURL = 'http://localhost:54200/api';
  //#endregion

  //#region  CONSTRUCTOR
  constructor(private http: HttpClient) { }
  //#endregion

  //#region EVENTS & METHODS
  getAllEmployee() {
    return this.http.get<Employee[]>(`${this.rootURL}/employee`);
  }

  getEmployeeById(employeeId: number) {
    return this.http.get<Employee>(`${this.rootURL}/employee/${employeeId}`);

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

