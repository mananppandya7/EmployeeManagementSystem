import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee/employee.service';
import { DefaultService } from 'src/app/common/default.service';

declare const bindCharts: any;

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  //#region VARIABLES

  //#endregion

  //#region  CONSTRUCTOR
  constructor(private employeeService: EmployeeService, private defaultService: DefaultService) { }
  //#endregion

  //#region LIFECYCLE HOOKS
  ngOnInit() {
    this.defaultService.routerLinkActive = "";

    this.employeeService.getDepartmentChart().subscribe(chartData => {
      bindCharts(chartData);
    });
  }
  //#endregion

  //#region EVENTS & METHODS

  //#endregion
}
