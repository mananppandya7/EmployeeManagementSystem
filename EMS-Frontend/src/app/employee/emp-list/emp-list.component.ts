import { Component, OnInit } from '@angular/core';
import { DefaultService } from 'src/app/common/default.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {

  //#region VARIABLES

  //#endregion

  //#region  CONSTRUCTOR
  constructor(private defaultService: DefaultService) { }
  //#endregion

  //#region EVENTS & METHODS
  ngOnInit() {
  }
  //#endregion
}