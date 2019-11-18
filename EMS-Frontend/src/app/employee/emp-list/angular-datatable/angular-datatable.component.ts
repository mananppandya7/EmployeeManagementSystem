import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';

import { Employee } from 'src/app/models/employee';
import { EmployeeService } from '../../employee.service';
import { DefaultService } from 'src/app/common/default.service';
import { EMSConstants } from '../../../common/ems.constants';

@Component({
  selector: 'app-angular-datatable',
  templateUrl: './angular-datatable.component.html',
  styleUrls: ['./angular-datatable.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AngularDatatableComponent implements OnInit, OnDestroy {

  //#region VARIABLES
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  rowData: Employee[] = [];
  dtTrigger: Subject<any> = new Subject();
  private closeResult: string;
  //#endregion 

  //#region  CONSTRUCTOR
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private defaultService: DefaultService
  ) { }
  //#endregion

  //#region LIFECYCLE HOOKS
  ngOnInit() {
    this.defaultService.routerLinkActive = '';

    this.dtOptions = {
      order: [],
      autoWidth: true,
      scrollX: true,
    };
    this.employeeService.getAllEmployee().subscribe(employee => {
      this.rowData = employee;
      this.dtTrigger.next();
    });
  }
  //#endregion

  //#region EVENTS & METHODS
  ngOnDestroy(): void {
    // Unsubscribe subscription.
    this.dtTrigger.unsubscribe();
  }

  // To see an Employee Detail
  onDetail(employeeId: number) {
    this.employeeService.backURL.next(EMSConstants.angularDataTable);
    this.router.navigate([`../detail/${employeeId}`], { relativeTo: this.activeRoute });
  }

  // To Edit an employee.
  onEdit(id: number) {
    this.router.navigate(['../' + id], { relativeTo: this.activeRoute });
  }

  // To Delete an employee.
  onDelete(content, employee: any, index: number) {
    this.modalService.open(content).result.then((result) => {
      this.employeeService.deleteEmployee(employee.employeeId).subscribe(emp => {
        this.toastr.success(`Employee (${emp.firstName + ' ' + emp.lastName}) deleted successfully.`);
        // Remove deleted row.
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.rowData.splice(index, 1);
          this.dtTrigger.next();
        });
      }, error => {
        this.toastr.error(`Error occured while deleting (${employee.firstName + ' ' + employee.lastName}) employee.`);
      });
    }, (reason) => {
      // Uncomment below line if you wish to perform custom logic on Modal dismiss.
      //this.closeResult = this.getDismissReason(reason);
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
