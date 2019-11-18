import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from 'src/app/models/employee';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMSConstants } from '../../common/ems.constants';

@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.css']
})
export class EmpDetailComponent implements OnInit {

  //#region VARIABLES
  employee: Employee;
  backURL: string;
  //#endregion

  //#region CONSTRUCTOR
  constructor(private employeeService: EmployeeService, private activeRoute: ActivatedRoute, private toastr: ToastrService) {}
  //#endregion

  //#region LIFECYCLE HOOKS
  ngOnInit() {

    let employeeId: number = +this.activeRoute.snapshot.params['id'];

    this.employeeService.getEmployeeById(employeeId).subscribe(emp => {
      this.employee = emp;
    }, error => {
      this.toastr.error("An error occured while fetching employee detail.");
    });

    this.employeeService.backURL.subscribe(gridType => {
      
      switch (gridType) {
        case EMSConstants.agGrid:
          this.backURL = `../../${EMSConstants.agGrid}`;
          break;
        case EMSConstants.angularDataTable:
          this.backURL = `../../${EMSConstants.angularDataTable}`;
          break;
       case EMSConstants.primeNG:
          this.backURL = `../../${EMSConstants.primeNG}`;
          break;
      }
    });
  }
//#endregion

//#region EVENTS & METHODS

  //#endregion
}
