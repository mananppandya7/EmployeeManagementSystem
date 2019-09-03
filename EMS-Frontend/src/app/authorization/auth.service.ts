import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';
import { APIUrl } from '../common/APIUrl';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../common/enums';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    //#region VARIABLES
    user = new BehaviorSubject<User>(null);
    //#endregion

    //#region CONSTRUCTOR
    constructor(public http: HttpClient) { }
    //#endregion

    //#region METHODS

    // Get authentication token from localStorage
    getToken(): string {
        return localStorage.getItem('token');
    }

    // Get auth-token on LogIn
    authenticateUser(user: User) {
        return this.http.post<User>(APIUrl.login, user);
    }

    // User authorization by Role & retrieve user role from JWT token.
    authorizeUser() {
        const token = this.getToken(); // Get Token from local storage
        
        let authToken = new HttpHeaders({ 'Authorization': "Bearer " + token }); // Attach token to HttpHeaders
        let httpOptions = { headers: authToken };

        let payLoad = JSON.parse(window.atob(token.split('.')[1])); // Get user Role from JWT token
        let userRole = payLoad.role;

        if (userRole === Role[Role.Admin]) {
            return this.http.get(APIUrl.authorizeAdmin, httpOptions);
        } else {
            return this.http.get(APIUrl.authorizeUser, httpOptions);
        }
    }

    //#endregion
}