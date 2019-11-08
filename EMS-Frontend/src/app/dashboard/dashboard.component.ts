import { Component, OnInit, DefaultIterableDiffer } from '@angular/core';
import { DefaultService } from '../common/default.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //#region VARIABLES
  
  //#endregion

  //#region  CONSTRUCTOR
  constructor(private defaultService: DefaultService) {
    defaultService.setJSReference("../assets/js/charts-home.js");
  }
  //#endregion

  //#region INIT METHODS
  ngOnInit() {
  }
  //#endregion
}