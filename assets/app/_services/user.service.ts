import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "../_models/user.model";

@Injectable()
export class UserService {
    private users: User[] = [];

    constructor(private http: Http) {}

    createUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getUsers(): Observable<{}> {
        return this.http.get('http://localhost:3000/user/list')
            .map((response: Response) => {
                const res = response.json();
                let newUsers: User[] = [];
                for (let user of res) {
                    newUsers.push(new User(
                        user.email,
                        user.password,
                        user.role,
                        user.location,
                        user.firstName,
                        user.lastName,
                        user.skype,
                        user.phone,
                        user.userSkill,
                        user._id)
                    );
                }
                this.users = newUsers;
                return newUsers;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getUserById(userId): Observable<{}> {
      return this.http.get('http://localhost:3000/user/' + userId)
        .map((response: Response) => {
          const res = response.json();
          return res;
        })
        .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteUser(user: User) {
        const body = JSON.stringify(user);
        return this.http.delete('http://localhost:3000/user/' + user.userId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    login(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}
