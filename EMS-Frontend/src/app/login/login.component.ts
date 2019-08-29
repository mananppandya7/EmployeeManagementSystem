import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DefaultService } from '../common/default.service';
import { AuthService } from '../authorization/auth.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //#region CONSTRUCTOR
  constructor(private defaultService: DefaultService, private authService: AuthService, private toastr: ToastrService) { }
  //#endregion

  //#region METHODS & EVENTS

  ngOnInit() {
    let frontJS = document.getElementById('dynamicScriptLoad'); // Get dynamically loaded script.

    if (frontJS != null)
      frontJS.remove(); // Remove dynamically loaded script to avoid CSS issue on LogIn page

    this.loadScript(); // Add script to avoiding CSS issue on LogIn page.
  }

  onLogin(loginForm: NgForm) {
    let userName = loginForm.value['username'];
    let password = loginForm.value['password'];

    let user = new User(0, '', '', userName, password, 0, ''); // Set value to user model and pass it to api

    this.authService.authenticateUser(user).subscribe(response => {
      if (response.id > 0) {
        this.authService.user.next(response);
        this.defaultService.logIn.next(true);

        localStorage.setItem('token', response.token); // Store token to the localStorage of browser
      }
    }, error => {
      // Handle error when API returns an error
      switch (error.status) {
        case 0:
          this.toastr.error('Oops! Verify API is working.');
          break;
        case 400:
          this.toastr.error('Incorrect username or password.');
          break;
      }
    });
  }

  // Continue to EMS without LogIn
  onWithoutLogin() {
    this.defaultService.logIn.next(true);
  }

  //#endregion

  //#region PRIVATE METHODS

  // Add .js file to resolve CSS issue in login page. Dynamically load script.
  private loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = '../../assets/js/front.js';
    script.async = true;
    script.defer = true;
    script.id = 'dynamicScriptLoad';
    body.appendChild(script);
  }
  //#endregion

}
