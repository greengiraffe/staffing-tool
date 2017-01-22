import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { User } from "../_models/user.model";

@Injectable()

export class NavBarService {

    private _showNavBar: Subject<User> = new Subject<User>();
    public getUserRole$ = this._showNavBar.asObservable();

    constructor() {}

    showNavBar(user: User) {
        this._showNavBar.next(user);
    }
}
