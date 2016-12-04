import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { SkillService } from '../_services/skill.service';
import { User } from '../_models/user.model';
import { UserProfileEditService } from "../_services/user-profile-edit.service";

@Component ({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.template.html',
    styleUrls: ['user-profile.style.scss'],
    providers: [UserService, SkillService, UserProfileEditService]
})

export class UserProfileComponent implements OnInit {

    user: User;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getUserById('583ddf5f22bb3a5fdf380fd5')
            .subscribe(
                (user: User) => this.user = user,
                error => console.log(error)
        );
    }
}
