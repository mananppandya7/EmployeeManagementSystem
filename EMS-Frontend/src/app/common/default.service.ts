import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Department } from '../models/department'
import { Designation } from '../models/designation'
import { State } from '../models/state';
import { Bloodgroup } from '../models/bloodgroup';

@Injectable({
  providedIn: 'root'
})

export class DefaultService {

  designations: Designation[];
  pageHeaderChanged = new Subject<string>();

  constructor() { }

  // For page header
  pageHeader(pageHeader: string) {
    this.pageHeaderChanged.next(pageHeader);
  }

  // Departments
  departments: Department[] = [
    new Department(1, "Finance"),
    new Department(2, "Human Resource"),
    new Department(3, "Information Technology")
  ];

  // States
  states: State[] = [
    new State(1, "California"),
    new State(2, "Florida"),
    new State(3, "Maryland"),
    new State(4, "Nevada"),
    new State(5, "New Hampshire"),
    new State(6, "New Jersey"),
    new State(7, "New Mexico"),
    new State(8, "New York"),
    new State(9, "North Dakota"),
    new State(10, "Ohio"),
    new State(11, "Oklahoma"),
    new State(12, "Oregon"),
    new State(13, "Pennsylvania"),
    new State(14, "Rhode Island"),
    new State(15, "South Carolina"),
    new State(16, "South Dakota"),
    new State(17, "Tennessee"),
    new State(18, "Texas"),
    new State(19, "West Virginia"),
    new State(20, "Wisconsin"),
  ];

  // Blood Groups
  bloodgroups: Bloodgroup[] = [
    new Bloodgroup(1, "A+"),
    new Bloodgroup(2, "A-"),
    new Bloodgroup(3, "AB+"),
    new Bloodgroup(8, "AB-"),
    new Bloodgroup(4, "B+"),
    new Bloodgroup(5, "B-"),
    new Bloodgroup(6, "O+"),
    new Bloodgroup(7, "O-")
  ];


  // Get Designations
  getDesignations(event, index) {

    //let department = event.target.options[index].text;

    switch (index) {
      // -- Select --
      case '0': {
        this.designations = null;
        break;
      }
      case '1': {
        this.designations = [
          new Designation(1, "HR Assistant"),
          new Designation(3, "HR Director"),
          new Designation(2, "HR Generalist"),
          new Designation(3, "HR Manager"),
          new Designation(4, "HR VP")
        ];
        break;
      }
      case '2': {
        this.designations = [
          new Designation(4, "Director Finance"),
          new Designation(1, "Finance Assistant"),
          new Designation(3, "Manager Finance"),
          new Designation(2, "Senior Officer Finance"),
        ];
        break;
      }
      case '3': {
        this.designations = [
          new Designation(1, "Developer"),
          new Designation(2, "Designer"),
          new Designation(3, "Quality Assurance")
        ];
        break;
      }
      default: {
        this.designations = null;
        break;
      }
    }
    return this.designations;
  }

  loadDynamicHeader() {
    let pageHeader = window.location.pathname.replace('/', '');
    if (pageHeader === '')
      pageHeader = "Dashboard";

    return pageHeader.charAt(0).toUpperCase() + pageHeader.substring(1);
  }
}
