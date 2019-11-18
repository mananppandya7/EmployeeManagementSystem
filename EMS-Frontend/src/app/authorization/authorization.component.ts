import { Component, OnInit } from '@angular/core';
import { DefaultService } from '../common/default.service';
import { Role } from '../common/enums';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  //#region VARIABLES
  authorizeData: any;
  isAdmin: boolean;
  //#endregion

  //#region CONSTRUCTOR
  constructor(private defaultService: DefaultService) { }
  //#endregion

  //#region LIFECYCLE HOOKS
  ngOnInit() {
    let isToken = localStorage.getItem('token'); // Get token from local storage
    let socialToken = localStorage.getItem('socialLoginToken'); // Get social login token from local storage

    if (isToken === null && socialToken === null) {
      this.defaultService.logIn.next(false); // If token is not exists then redirect to login page.
    } else {
      if (isToken !== null) {
        let payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1])); // Get user Role from JWT token
        let userRole = payLoad.role;

        if (userRole === Role[Role.Admin]) {
          this.isAdmin = true; // Dynamically display Admin/User section
        }
      } else {
        this.isAdmin = false;
      }
    }
  }
  //#endregion

  //#region EVENTS & METHODS

  //#endregion
}
