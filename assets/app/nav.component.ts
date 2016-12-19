import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { User } from "./_models/user.model";
import { UserService } from "./_services/user.service";


@Component({
    selector: 'app-nav',
    templateUrl: 'nav.template.html',
    providers: [UserService]
})

export class NavComponent {
    user: User;

    constructor(private auth: AuthService, private userService: UserService) {}

    ngOnInit() {
        let currentUserId = localStorage.getItem("userId")
        this.userService.getUserById(currentUserId)
            .subscribe(
                (user: User) => this.user = user,
                error => console.log(error)
        );
    }
}
