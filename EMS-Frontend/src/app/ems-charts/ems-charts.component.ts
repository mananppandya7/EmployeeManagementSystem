import { Component, OnInit } from '@angular/core';
import { DefaultService } from '../common/default.service';

@Component({
  selector: 'app-ems-charts',
  templateUrl: './ems-charts.component.html',
  styleUrls: ['./ems-charts.component.css']
})

export class EmsChartsComponent implements OnInit {

  //#region VARIABLES

  //#endregion

  //#region  CONSTRUCTOR
  constructor(private defaultService: DefaultService) { }
  //#endregion

  //#region LIFECYCLE HOOKS
  ngOnInit() {
    this.defaultService.setJSReference("src/assets/js/ems.charts.js");
  }
  //#endregion

  //#region EVENTS & METHODS

  //#endregion
}
