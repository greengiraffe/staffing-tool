import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "../_models/user.model";
import { tokenNotExpired } from "angular2-jwt";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

    constructor(private http: Http, private router: Router) {}

    login(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/api/login', body, {headers: headers})
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
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logout() {
        localStorage.clear();
        this.router.navigateByUrl('/auth/login');
    }

    loggedIn() {
        return tokenNotExpired();
    }

    currentUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }
}
