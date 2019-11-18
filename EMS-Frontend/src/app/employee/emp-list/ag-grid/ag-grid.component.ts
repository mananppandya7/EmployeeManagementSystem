import { Component, OnInit, Inject, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeService } from '../../employee.service';
import { ButtonRenderedComponent } from '../../button-rendered/button-rendered.component';
import { ImageRenderedComponent } from '../../../employee/image-rendered/image-rendered.component';
import { DefaultService } from 'src/app/common/default.service';
import { EMSConstants } from 'src/app/common/ems.constants';


@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgGridComponent implements OnInit {
  //#region VARIABLES
  agGrid: AgGridAngular;
  frameworkComponents: any;
  private closeResult: string;
  private rowSelection;
  private gridApi;
  private paginationPageSize;
  private domLayout;
  private imageParam;
  //#endregion

  //#region  CONSTRUCTOR
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private employeeService: EmployeeService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private defaultService: DefaultService
  ) {

    this.frameworkComponents = {
      buttonRendered: ButtonRenderedComponent,
      imageRendered: ImageRenderedComponent,
    }

    this.rowSelection = "multiple";
    this.paginationPageSize = 10;
    this.domLayout = "autoHeight";
  }
  //#endregion

  //#region  AG-GRID COLUMNS
  columnDefs = [
    {
      headerName: 'FirstName',
      field: 'firstName',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: 'LastName',
      field: 'lastName',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: "Email",
      field: 'email',
      sortable: true,
      filter: "text",
    },
    {
      headerName: "DateOfBirth",
      field: 'dateOfBirth',
      sortable: true,
      filter: "text",
      width: 150,
      cellRenderer: (dateOfBirth) => {
        return formatDate(dateOfBirth.value, 'dd-MM-yyyy', this.locale);
      }
    },
    {
      headerName: "DateOfJoining",
      field: 'dateOfJoining',
      sortable: true,
      filter: "text",
      width: 165,
      cellRenderer: (dateOfJoining) => {
        return formatDate(dateOfJoining.value, 'dd-MM-yyyy', this.locale);
      }
    },
    {
      headerName: "Department",
      field: 'department',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: "Designation",
      field: 'designation',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: "Address",
      field: 'address',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: "State",
      field: 'state',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: "City",
      field: 'city',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: "Postcode",
      field: 'postcode',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: "ContactNumber",
      field: 'contactNumber',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: "Gender",
      field: 'gender',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: "MaritalStatus",
      field: 'maritalStatus',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: "BloodGroup",
      field: 'bloodGroup',
      sortable: true,
      filter: "text",
      width: 150,
      cellStyle: { 'text-align': 'center' },
      cellRenderer: "imageRendered",
      cellRendererParams: {
        image: ''
      },
    },
    {
      headerName: "IdentityType",
      field: 'identityType',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: "IdentityNumber",
      field: 'identityNumber',
      sortable: true,
      filter: "text",
      width: 150,
    },
    {
      headerName: 'Detail',
      cellRenderer: 'buttonRendered',
      cellRendererParams: {
        onClick: this.onDetail.bind(this),
        fa: 'fa fa-info-circle',
        iconClass: 'detail-icon'
      },
      cellStyle: function (params) {
        return { "text-align": "center" };
      },
      width: 56,
      pinned: "right",
    },
    {
      headerName: 'Edit',
      cellRenderer: 'buttonRendered',
      cellRendererParams: {
        onClick: this.onEdit.bind(this),
        fa: 'fa fa-edit',
        iconClass: 'edit-icon'
      },
      cellStyle: function (params) {
        return { "text-align": "center" };
      },
      width: 50,
      pinned: "right",
    },
    {
      headerName: 'Delete',
      cellRenderer: 'buttonRendered',
      cellRendererParams: {
        onClick: this.onDelete.bind(this),
        fa: 'fa fa-trash',
        iconClass: 'delete-icon'
      },
      cellStyle: function (params) {
        return { "text-align": "center" };
      },
      width: 65,
      pinned: "right",
    }
  ];
  //#endregion

  //#region  AG-GRID ROWS
  rowData: any;
  //#endregion

  //#region LIFECYCLE HOOKS
  ngOnInit() {

    this.defaultService.routerLinkActive = "active";

    this.employeeService.getAllEmployee().subscribe(employee => {
      this.rowData = employee
    });
  }
  //#endregion

  //#region EVENTS & METHODS
  onGridReady(params) {
    this.gridApi = params.api;
    // To auto-height AG-Grid
    this.gridApi.setDomLayout("autoHeight");
  }

  onPageSizeChanged(event) {
    this.gridApi.paginationSetPageSize(Number(event.target.value));
  }

  onDetail(event) {
    this.employeeService.backURL.next(EMSConstants.agGrid);
    this.router.navigate(['detail', event.rowData.employeeId], { relativeTo: this.activeRouter });
  }

  onEdit(event) {
    this.router.navigate([event.rowData.employeeId], { relativeTo: this.activeRouter });
  }

  onDelete(e) {
    this.modalService.open(e.event).result.then((result) => {
      this.employeeService.deleteEmployee(e.rowData.employeeId).subscribe(emp => {
        this.toastr.success(`Employee (${emp.firstName + ' ' + emp.lastName}) deleted successfully.`);
        this.gridApi.updateRowData({ remove: this.gridApi.getSelectedRows() });
      }, error => {
        this.toastr.error(`Error occured while deleting (${e.rowData.firstName + ' ' + e.rowData.lastName}) employee.`);
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