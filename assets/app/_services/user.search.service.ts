import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from "../_models/user.model";

@Injectable()
export class UserSearchService {

    // Observable sources
    private userAddedSource = new Subject<User>();
    private userReceivedSource = new Subject<User>();
    private userRemovedSource = new Subject<User>();
    private resetSearchSource = new Subject<any>();

    // Observable streams
    userAdded$ = this.userAddedSource.asObservable();
    userRemoved$ = this.userRemovedSource.asObservable();
    userReceived$ = this.userReceivedSource.asObservable();
    searchReset$ = this.resetSearchSource.asObservable();

    addUser(user: User) {
        this.userAddedSource.next(user);
    }

    userAdded(user: User) {
        this.userReceivedSource.next(user);
    }

    userRemoved(user: User) {
        this.userRemovedSource.next(user);
    }

    resetSearch() {
        this.resetSearchSource.next();
    }
}
