import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';

@Component ({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.template.html',
    providers: [UserService],
    styleUrls: ['user-profile.style.scss']
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
