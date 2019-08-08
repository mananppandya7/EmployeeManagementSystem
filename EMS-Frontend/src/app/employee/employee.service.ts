import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Employee } from '../models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // Web API URL
  rootURL = 'http://localhost:54200/api';

  constructor(private http: HttpClient) { }

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
}

