import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DefaultService } from 'src/app/common/default.service';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from '../../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EMSConstants } from '../../../common/ems.constants';

@Component({
  selector: 'app-prime-ng',
  templateUrl: './prime-ng.component.html',
  styleUrls: ['./prime-ng.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrimeNGComponent implements OnInit {

  //#region VARIABLES
  rowData: Employee[];
  employee_cols;
  paginator_rows = 10;
  private closeResult: string;
  //#endregion

  //#region  CONSTRUCTOR
  constructor(
    private defaultService: DefaultService,
    private employeeService: EmployeeService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }
  //#endregion

  //#region LIFECYCLE HOOKS
  ngOnInit() {
    this.defaultService.routerLinkActive = "";

    this.employee_cols = [
      { field: 'firstName', header: 'FirstName' },
      { field: 'lastName', header: 'LastName' },
      { field: 'email', header: 'Email' },
      { field: 'dateOfBirth', header: 'DateOfBirth' },
      { field: 'dateOfJoining', header: 'DateOfJoining' },
      { field: 'department', header: 'Department' },
      { field: 'designation', header: 'Designation' },
      { field: 'address', header: 'Address' },
      { field: 'state', header: 'State' },
      { field: 'city', header: 'City' },
      { field: 'postcode', header: 'Postcode' },
      { field: 'contactNumber', header: 'ContactNumber' },
      { field: 'gender', header: 'Gender' },
      { field: 'maritalStatus', header: 'MaritalStatus' },
      { field: 'bloodGroup', header: 'BloodGroup' },
      { field: 'identityType', header: 'IdentityType' },
      { field: 'identityNumber', header: 'IdentityNumber' },
    ];

    this.employeeService.getAllEmployee().subscribe(employee => {
      this.rowData = employee;
    });
  }
//#endregion

  //#region EVENTS & METHODS
  // To paginator rows.
  onPageSizeChanged(index: number) {
    this.paginator_rows = index
  }

  // To see an Employee Detail.
  onDetail(employeeId: number) {
    this.employeeService.backURL.next(EMSConstants.primeNG);
    this.router.navigate([`../detail/${employeeId}`], { relativeTo: this.activeRoute });
  }

  // To Edit an employee.
  onEdit(employeeId: number) {
    this.router.navigate([`../${employeeId}`], { relativeTo: this.activeRoute });
  }

  // To Delete an employee.
  onDelete(content, employee: any, index: number) {
    this.modalService.open(content).result.then((result) => {
      this.employeeService.deleteEmployee(employee.employeeId).subscribe(emp => {
        this.toastr.success(`Employee (${emp.firstName + ' ' + emp.lastName}) deleted successfully.`);
        // Remove deleted row.
        this.rowData.splice(index, 1);
      }, error => {
        this.toastr.error(`Error occured while deleting (${employee.firstName + ' ' + employee.lastName}) employee.`);
      });
    }, (reason) => {
      // Uncomment below line if you wish to perform custom logic on Modal dismiss.
      // this.closeResult = this.getDismissReason(reason);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //#endregion
}
