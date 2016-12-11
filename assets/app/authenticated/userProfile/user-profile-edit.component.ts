import { Component, OnInit } from '@angular/core';

import { User } from "../../_models/user.model";
import { UserService } from "../../_services/user.service";
import { SkillService } from "../../_services/skill.service";
import { UserProfileEditService } from "../../_services/user-profile-edit.service";

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: 'user-profile-edit.template.html',
  styleUrls: ['user-profile.style.scss'],
  providers: [UserService, SkillService, UserProfileEditService]
})

export class UserProfileEditComponent {

    user: User;
    email;
    location;
    phone;

    constructor(private userService: UserService, private userProfileEditService: UserProfileEditService) {}

    ngOnInit() {
        this.userService.getUserById('583ddf5f22bb3a5fdf380fd5')
            .subscribe(
                (user: User) => this.user = user,
                error => console.log(error)
            );
    }

    /**
     * Updates the current user
     */
    saveChanges() {
        this.user.phone = this.phone;
        this.user.userSkills = this.userProfileEditService.userSkills;
        this.userService.updateUser(this.user)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
    }

}