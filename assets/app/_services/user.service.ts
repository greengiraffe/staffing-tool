import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
// import config = require ("../../../config/config");

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
                        user.phone,
                        user.userSkills,
                        user._id)
                    );
                }
                this.users = newUsers;
                return newUsers;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getUserById(userId): Observable<{}> {
      return this.http.get('http://localhost:3000/user/id/' + userId)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    updateUser(user: User): Observable<{}> {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put('http://localhost:3000/user', body, { headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteUser(user: User) {
        this.users.splice(this.users.indexOf(user), 1);
        const body = JSON.stringify(user);
        return this.http.delete('http://localhost:3000/user/' + user.userId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
