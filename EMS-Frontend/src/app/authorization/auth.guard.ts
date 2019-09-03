import { CanActivate, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthenticationService } from './auth.service';
import { DefaultService } from '../common/default.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    //#region CONSTRUCTOR
    constructor(private authService: AuthenticationService, private defaultService: DefaultService) { }
    //#endregion

    //#region METHODS

    // Helps to prevent route-authenticate from unknown user (AuthGuard)
    canActivate(): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        let token = localStorage.getItem('token');
        let socialToken = localStorage.getItem('socialLoginToken');
        let isAuth: boolean;

        return this.authService.user.pipe(take(1), map(user => {
            if (token !== null)
                isAuth = !!user || token != null;
            else
                isAuth = socialToken != null;

            if (isAuth) {
                return true;
            } else {
                this.defaultService.logIn.next(false);
                return false;
            }
        }));
    }

    //#endregion
}