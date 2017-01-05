import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';
import { UserSearchService } from '../../_services/user.search.service';

@Component({
  selector: 'app-user-search',
  template: `
    <input
      [(ngModel)]="searchText"
      class="user-search form-control"
      placeholder="Search for a User"
      type="text" (click)="showUserList = true">
      <div *ngIf="showUserList" class="user-list" [ngSwitch]="clickableUser">
        <div class="user" *ngFor="let user of visibleUsers | filter : 'lastName' : searchText" (click)="selectUser(user)">{{ user.firstName }} {{ user.lastName }}</div>
      </div>

    <p *ngIf="users?.length === 0">There are no more available users.</p>
  `,
  styleUrls: ['user.search.style.scss']
})

export class UserSearchComponent implements OnInit {
    users: User[];
    visibleUsers: User[] = [];
    hiddenUsers: User[] = [];
    searchText;
    showUserList = false;

    constructor(private userService: UserService,
                private userSearchService: UserSearchService){}

    ngOnInit(){
        this.userService.getUsers()
            .subscribe(
                users => {
                    this.users = users as User[];
                    this.visibleUsers = users as User[];
                    this.sortUsers();
                },
                error => console.log(error)
            )

        this.userSearchService.userReceived$.subscribe(
            receivedUser => this.hideUser(receivedUser));

        this.userSearchService.userRemoved$.subscribe(
            removedUser => this.showUser(removedUser));

        this.userSearchService.searchReset$.subscribe(() => {
            this.reset();
        });
    }

    selectUser(user: User) {
        this.searchText = null;
        this.userSearchService.addUser(user);
        this.showUserList=false;
    }

    hideUser(user: User) {
        this.hiddenUsers.push(user);
        this.visibleUsers = this.visibleUsers.filter(visibleUser => visibleUser._id !== user._id);
    }

    showUser(user: User) {
        this.visibleUsers.push(user);
        this.hiddenUsers = this.hiddenUsers.filter(hiddenUser => hiddenUser._id !== user._id);
        this.sortUsers();
    }

    reset() {
        this.visibleUsers = new Array<User>();
        this.visibleUsers.push(...this.users);
        this.sortUsers();
    }

    sortUsers() {
        this.visibleUsers.sort((a, b) => {
            if (a.lastName < b.lastName) return -1;
            else if (a.lastName > b.lastName) return 1;
            else return 0;
        })
    }
}
