import { Component, OnInit, Output } from '@angular/core';
import { DefaultService } from '../common/default.service';
import { AuthorizationComponent } from '../authorization/authorization.component';

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
  constructor(private defaultService: DefaultService) { }
  //#endregion

  //#region EVENTS & METHODS
  ngOnInit() {

    let token = localStorage.getItem('token');

    if (token != null) {
      this.isLoggedIn = true;
    }
  }

  // Display login page
  onLogin() {
    this.defaultService.logIn.next(false);
    //this.isLoggedIn = false;
  }

  // Display confirmation message on logout
  onLogout() {
    let confirmMsg = confirm('Are you sure you want to logout?');

    if (confirmMsg) {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      //this.defaultService.logIn.next(true);
      //this.defaultService.logIn.complete();
    } else
      return;
  }
  
  //#endregion
}
