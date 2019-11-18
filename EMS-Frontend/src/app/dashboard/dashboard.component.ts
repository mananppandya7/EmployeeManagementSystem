import { Component, OnInit, DefaultIterableDiffer } from '@angular/core';
import { DefaultService } from '../common/default.service';
import { EmployeeService } from '../employee/employee.service';
import { Chart } from '../dashboard/chart';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //#region VARIABLES
  Department = [];
  EmployeeCount = [];
  PieChart = [];
  //#endregion

  //#region  CONSTRUCTOR
  constructor(private defaultService: DefaultService, private employeeService: EmployeeService) {
    defaultService.setJSReference("../assets/js/charts-home.js");
  }
  //#endregion

  //#region LIFECYCLE HOOKS
  ngOnInit() {
    this.employeeService.getDepartmentChart().subscribe((result: Chart[]) => {
      result.forEach(x => {
        this.Department.push(x.department);
        this.EmployeeCount.push(x.employeecount);
      });
    });
  }
  //#endregion

}