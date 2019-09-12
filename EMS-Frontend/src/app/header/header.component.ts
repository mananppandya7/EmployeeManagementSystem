import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from 'angularx-social-login';

import { DefaultService } from '../common/default.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //#region VARIABLES
  isLoggedIn: boolean = false;
  //#endregion

  //#region CONSTRUCTOR
  constructor(private defaultService: DefaultService, private socialAuthService: AuthService) { }
  //#endregion

  //#region EVENTS & METHODS
  ngOnInit() {
    let token = localStorage.getItem('token');
    let socialLogin = localStorage.getItem('socialLoginToken');

    if (token !== null || socialLogin !== null) {
      this.isLoggedIn = true;
    }
  }

  // Display login page
  onLogin() {
    this.defaultService.logIn.next(false);
    //this.isLoggedIn = false;
  }

  // Based on confirmation logout user.
  onLogout() {
    let confirmMsg = confirm('Are you sure you want to logout?');
    let token = localStorage.getItem('token');

    if (confirmMsg) {
      if (token != null)
        localStorage.removeItem('token');
      else {
        this.socialAuthService.signOut();
        localStorage.removeItem('socialLoginToken');
      }

      this.isLoggedIn = false;
    } else return;
  }

  //#endregion
}
