import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

import { Department } from '../models/department'
import { Designation } from '../models/designation'
import { State } from '../models/state';
import { Bloodgroup } from '../models/bloodgroup';
import { Identitytype } from '../models/identitytype';

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  //#region VARIABLES
  designations: Designation[];
  pageHeaderChanged = new BehaviorSubject('Dashboard');
  logIn = new Subject<boolean>();
  agGridRouterLinkActive: string;
  //#endregion

  //#region  CONSTRUCTOR
  constructor() { }
  //#endregion



  //#region EVENTS & METHODS
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

  // Identity types
  identitytype: Identitytype[] = [
    new Identitytype(1, 'Aadhaar Card'),
    new Identitytype(2, 'License'),
    new Identitytype(3, 'PAN Card'),
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
    new Bloodgroup(4, "AB-"),
    new Bloodgroup(5, "B+"),
    new Bloodgroup(6, "B-"),
    new Bloodgroup(7, "O+"),
    new Bloodgroup(8, "O-")
  ];

  // Get Designations
  getDesignations(event, index) {

    switch (index) {
      // -- Select --
      case '0': {
        this.designations = null;
        break;
      }
      case '1': {
        this.designations = [
          new Designation(1, "Director Finance"),
          new Designation(2, "Finance Assistant"),
          new Designation(3, "Manager Finance"),
          new Designation(4, "Senior Officer Finance")
        ];
        break;
      }
      case '2': {
        this.designations = [
          new Designation(1, "HR Assistant"),
          new Designation(2, "HR Director"),
          new Designation(3, "HR Generalist"),
          new Designation(4, "HR Manager"),
          new Designation(5, "HR VP")
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


  getIdentityType(index: number) {
    return this.identitytype.find(x => x.id === index).name;
  }

  // To Parse Date
  parseDate(date: any) {
    const currentDate = new Date(date);
    return currentDate.toISOString().substring(0, 10);
  }

  // To Parse Date using Pipes
  parseDate2(date: any) {
    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd'; // YYYY-MM-DD
    let dtr = dp.transform(new Date(date), p);
    return dtr;
  }

  // Get today's date
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  //#endregion
}
