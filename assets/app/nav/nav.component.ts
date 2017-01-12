import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from "../_models/user.model";
import { UserService } from "../_services/user.service";
import { Router } from "@angular/router";


@Component({
    selector: 'app-nav',
    templateUrl: 'nav.template.html',
    styleUrls: ['nav.style.scss'],
    providers: [UserService]
})

export class NavComponent {
    user: User;
    private isAdminUser = false;
    private isActiveDropdown = false;

    constructor(private auth: AuthService,
                private userService: UserService,
                private router: Router) {}

    ngOnInit() {
        let currentUserId = localStorage.getItem("userId");

        this.userService.getUserById(currentUserId)
            .subscribe(
                (user: User) => {
                    this.user = user,
                    this.isAdminUser = user.role === "admin";
                },
                error => console.log(error)
        );
    }

    toggleDropdown(event) {
        event.preventDefault();
        this.isActiveDropdown = !this.isActiveDropdown;
    }

    closeDropdown() {
        this.isActiveDropdown = false;
    }
}
