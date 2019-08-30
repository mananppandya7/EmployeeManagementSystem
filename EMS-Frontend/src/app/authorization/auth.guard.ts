import { CanActivate, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';
import { DefaultService } from '../common/default.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    //#region CONSTRUCTOR
    constructor(private authService: AuthService, private defaultService: DefaultService) { }
    //#endregion

    //#region METHODS

    // Helps to prevent route-authenticate from unknown user (AuthGuard)
    canActivate(): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        let token = localStorage.getItem('token');

        return this.authService.user.pipe(take(1), map(user => {
            let isAuth = !!user || token != null;

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