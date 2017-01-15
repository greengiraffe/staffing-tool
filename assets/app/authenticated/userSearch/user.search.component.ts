import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user.model';
import { Skill } from "../../_models/skill.model";
import { UserService } from '../../_services/user.service';
import { UserSearchService } from '../../_services/user.search.service';

@Component({
  selector: 'app-user-search',
  template: `
    <input
      [(ngModel)]="searchText"
      class="user-search form-control"
      placeholder="Search for a User"
      type="text" (click)="openUserList()">
      <div *ngIf="showUserList" class="user-list" [ngSwitch]="clickableUser">
        <div class="user" *ngFor="let user of visibleUsers | filter : 'lastName' : searchText" (click)="selectUser(user)">
            <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
            <div class="user-match" *ngIf="user.match || user.match === 0">{{ user.match | percent}}</div>
        </div>
      </div>

    <p *ngIf="users?.length === 0">There are no more available users.</p>
  `,
  styleUrls: ['user.search.style.scss']
})

export class UserSearchComponent implements OnInit {
    @Input() requiredSkills;
    users: User[];
    visibleUsers: any[] = [];
    hiddenUsers: any[] = [];
    searchText;
    showUserList = false;

    constructor(private userService: UserService,
                private userSearchService: UserSearchService){}

    ngOnInit(){
        this.userService.getUsers()
            .subscribe(
                users => {
                    this.users = users as User[];
                    this.visibleUsers = users as any[];
                    this.sortUsers();
                },
                error => console.log(error)
            );

        this.userSearchService.userReceived$.subscribe(
            receivedUser => this.hideUser(receivedUser)
        );

        this.userSearchService.userRemoved$.subscribe(
            removedUser => this.showUser(removedUser)
        );

        this.userSearchService.searchReset$.subscribe(() => {
            this.reset();
        });

        this.userSearchService.calculateMatch$.subscribe(
            requiredSkills => this.calculateMatch(requiredSkills)
        );
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
            return b.match - a.match;
        })
    }

    calculateMatch(requiredSkills: Skill[]){
        for(let user of this.visibleUsers){
            user.match = 0;
            for(let userSkill of user.userSkills){
                for(let reqSkill of requiredSkills){
                    if(userSkill.skill._id === reqSkill._id){
                        switch(userSkill.rating){
                            case 0: user.match += 0.25;
                                    break;
                            case 1: user.match += 0.7;
                                    break;
                            case 2: user.match += 1;
                                    break;
                            default: user.match += 0;
                        }
                    }
                }
            }
            user.match = (user.match / requiredSkills.length);
        }
        this.sortUsers();
    }

    openUserList(){
        this.calculateMatch(this.requiredSkills);
        this.sortUsers();
        this.showUserList = true;
    }
}
