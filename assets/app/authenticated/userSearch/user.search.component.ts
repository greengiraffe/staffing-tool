import {Component, OnInit, Input} from '@angular/core';
import { User } from '../../_models/user.model';
import { Skill } from "../../_models/skill.model";
import { UserService } from '../../_services/user.service';
import { UserSearchService } from '../../_services/user.search.service';

@Component({
  selector: 'app-user-search',
  templateUrl: 'user.search.template.html',
  styleUrls: ['user.search.style.scss']
})

export class UserSearchComponent implements OnInit {
    @Input() requiredSkills;
    @Input() interestedUsers: any[];
    users: any[];
    visibleUsers: any[] = [];
    hiddenUsers: any[] = [];
    searchText;
    showUserList = false;
    urlsOfLoadedPictures = {};

    constructor(private userService: UserService,
                private userSearchService: UserSearchService){}

    ngOnInit(){
        this.userService.getUsers()
            .subscribe(
                users => {
                    this.users = users as any[];
                    this.visibleUsers = [];
            outer: for(let user of this.users) {
                        for(let interested of this.interestedUsers) {
                            if(interested._id.localeCompare(user._id)===0) {
                                continue outer;
                            }
                        }
                        this.visibleUsers.push(user);
                    }
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
        this.showUserList = false;
    }

    hideUser(user: User) {
        this.hiddenUsers.push(user);
        this.visibleUsers = this.visibleUsers.filter(visibleUser => visibleUser._id !== user._id);
    }

    showUser(user: User) {
        if (this.visibleUsers.findIndex(u => u._id === user._id) !== -1) {
            // prevent adding a duplicate
            return;
        }
        this.visibleUsers.push(user);
        this.hiddenUsers = this.hiddenUsers.filter(hiddenUser => hiddenUser._id !== user._id);
        this.sortUsers();
    }

    reset() {
        this.visibleUsers = new Array<any>();
        this.visibleUsers.push(...this.users);
        this.sortUsers();
    }

    sortUsers() {
        this.visibleUsers.sort((a, b) => {
            return b.match - a.match;
        });

        if(this.interestedUsers) {
            this.interestedUsers.sort((a,b) => {
                return b.match - a.match;
            })
        }
    }

    calculateMatch(requiredSkills: Skill[]){
        function doCalculation(users, interested) {
            for(let user of users)  {
                user.match = 0;
                if(requiredSkills.length > 0) {
                    for(let userSkill of user.userSkills) {
                        for(let reqSkill of requiredSkills) {
                            var expression;
                            if(interested) {
                                expression = userSkill.skill === reqSkill._id;
                            } else {
                                expression = userSkill.skill._id === reqSkill._id
                            }
                            if(expression) {
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
                    user.match = (user.match / requiredSkills.length).toFixed(2);
                }
            }
        }
        doCalculation(this.visibleUsers, false);

        if(this.interestedUsers) {
            doCalculation(this.interestedUsers, true);
        }
        this.sortUsers();
    }

    openUserList(){
        this.calculateMatch(this.requiredSkills);
        this.sortUsers();
        this.showUserList = true;
    }

    retrieveImgURLs() {
        this.users.forEach( user => {
            let url = localStorage.getItem(user._id);
            this.urlsOfLoadedPictures[user._id] = url ? url : '/img/usersmall.png';
        });
    }
}
