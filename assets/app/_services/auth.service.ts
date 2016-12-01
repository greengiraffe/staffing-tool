import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
// import config = require ("../../../config/config");

import { User } from "../_models/user.model";
import {tokenNotExpired} from "angular2-jwt";

@Injectable()
export class AuthService {
    // logged in user:
    private user: User;

    constructor(private http: Http) {}

    login(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/login', body, {headers: headers})
            .map((response: Response) => {
                let res = response.json();
                user = new User(
                    res.user.email,
                    null,
                    res.user.role,
                    res.user.location,
                    res.user.firstName,
                    res.user.lastName,
                    res.user.phone,
                    null,
                    res.user._id
                );
                localStorage.setItem('token', res.token);
                localStorage.setItem('displayUser', res.user.firstName + ' ' + res.user.lastName);
                localStorage.setItem('userId', res.user._id);
                localStorage.setItem('role', res.user.role);
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logout() {
        localStorage.clear();
    }

    loggedIn() {
        return tokenNotExpired();
    }

    getLoggedUser() {
        return this.user;
    }
}
