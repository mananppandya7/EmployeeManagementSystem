import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoogleLoginProvider, AuthService, SocialUser, FacebookLoginProvider } from 'angularx-social-login';

import { DefaultService } from '../common/default.service';
import { AuthenticationService } from '../authorization/auth.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { EMSConstants } from '../common/ems.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  //#region VARIABLES
  user: SocialUser;
  pwdType: string;
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private defaultService: DefaultService,
    private AuthenticationService: AuthenticationService,
    private toastr: ToastrService,
    private socialAuthService: AuthService
  ) { }
  //#endregion

  //#region LIFECYCLE HOOKS
  ngOnInit() {

    this.AddRemoveScript();

    // Set Password Type : password
    this.pwdType = 'password';
  }

  ngOnDestroy() {
    this.AddRemoveScript();
  }
  //#endregion

  //#region METHODS & EVENTS
  
  // Login into EMS
  onLogin(loginForm: NgForm) {
    let userName = loginForm.value['username'];
    let password = loginForm.value['password'];

    let user = new User(0, '', '', userName, password, 0, ''); // Set value to user model and pass it to api

    this.AuthenticationService.authenticateUser(user).subscribe(response => {
      if (response.id > 0) {
        this.AuthenticationService.user.next(response);
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

  // Show / Hide Password
  onShowHidePassword() {
    if (this.pwdType === 'text')
      this.pwdType = 'password';
    else
      this.pwdType = 'text';
  }

  // Continue to EMS without LogIn
  onWithoutLogin() {
    this.defaultService.logIn.next(true);
  }

  // Login With social accounts e.g. Google, Facebook
  onSocialLogin(provider: string) {
    // Get provider name.
    let socialProvider = provider === 'google' ? GoogleLoginProvider.PROVIDER_ID : FacebookLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialProvider).then((userData) => {
      if (userData != null) {
        this.user = userData;
        localStorage.setItem('socialLoginToken', this.user.idToken); // Store social login token to local storage.
        this.defaultService.logIn.next(true); // On successful Log-In redirect user to dashboard.
      }
    }, (reason) => {
      if (reason !== EMSConstants.LogInCancelReason)
        this.toastr.error(`'Error occured while log-in with '${provider}.`);
    });
  }

  //#endregion

  //#region PRIVATE METHODS

  // Load javascript dynamically at runtime.
  private loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    //script.innerHTML = '';
    script.src = '../../assets/js/front.js';
    // script.async = true;
    // script.defer = true;
    script.id = 'dynamicScriptLoad';
    body.appendChild(script);
  }

  // Add/Remove script dynamically.
  private AddRemoveScript() {
    let frontJS = document.getElementById('dynamicScriptLoad'); // Get dynamically loaded script.

    // Remove script if already loaded to avoid duplication.
    if (frontJS != null)
      frontJS.remove(); // To avoid console errors on page

    this.loadScript(); 
  }

  //#endregion
}
