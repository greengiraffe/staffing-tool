import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';
import { Skill } from '../_models/skill.model';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: 'user-profile-edit.template.html',
  styleUrls: ['user-profile.style.scss'],
  providers: [UserService]
})

export class UserProfileEditComponent {

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
