import {Component, OnInit, Input} from '@angular/core';
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
      <div class="user-list" [ngSwitch]="clickableUser">
        <div class="user" *ngFor="let interested of interestedUsers | filterNames : 'firstName' : 'lastName' : searchText"
         (click)="selectUser(user)">
         <div class="user-info">
             <img class="avatar {{interested._id}}" alt="profile picture" >
            {{ interested.firstName }} {{ interested.lastName }}
            <span class="tag tag-default">interested</span>
         </div>
         <div class="user-match" *ngIf="interested.match || interested.match === 0">{{ interested.match | percent}}</div>
        </div>
        <div class="user" *ngFor="let user of visibleUsers | filterNames : 'firstName' : 'lastName' : searchText" (click)="selectUser(user)">
            <div class="user-info"><img class="avatar" [src]="urlsOfLoadedPictures[user._id] | safeUrl" alt="profile picture" >{{ user.firstName }} {{ user.lastName }}</div>
            <div class="user-match" *ngIf="user.match || user.match === 0">{{ user.match | percent }}</div>
        </div>
      </div>
    <p *ngIf="users?.length === 0">There are no more available users.</p>
  `,
  styleUrls: ['user.search.style.scss']
})

export class UserSearchComponent implements OnInit {
    @Input() requiredSkills;
    @Input() interestedUsers;
    users: User[];
    visibleUsers: any[] = [];
    hiddenUsers: any[] = [];
    searchText;
    showUserList = false;
    urlsOfLoadedPictures: Object = new Object();

    constructor(private userService: UserService,
                private userSearchService: UserSearchService){}

    ngOnInit(){
        this.userService.getUsers()
            .subscribe(
                users => {
                    this.users = users as User[];
                    this.visibleUsers = users as any[];
                    this.sortUsers();
                    this.retrieveImgURLs();
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
        this.showUserList = false;
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

        if(this.interestedUsers) {
            this.interestedUsers.sort((a,b) => {
                return b.match - a.match;
            })
        }
    }

    calculateMatch(requiredSkills: Skill[]){
        function doCalculation(users) {
            for(let user of users)  {
                user.match = 0;
                if(requiredSkills.length > 0) {
                    for(let userSkill of user.userSkills) {
                        for(let reqSkill of requiredSkills) {
                            if(userSkill.skill._id === reqSkill._id) {
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
                    user.match = (user.match / requiredSkills.length).toFixed(3);
                }
            }
        }
        doCalculation(this.visibleUsers);

        if(this.interestedUsers) {
            doCalculation(this.interestedUsers);
        }
        this.sortUsers();
    }

    openUserList(){
        this.showUserList = true;
        this.calculateMatch(this.requiredSkills);
        this.sortUsers();
    }

    retrieveImgURLs() {
        this.users.forEach( user => {
            let url = sessionStorage.getItem(user._id);
            this.urlsOfLoadedPictures[user._id] = url ? url : '/img/usersmall.png';
        });
    }
}
