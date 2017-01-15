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
    private isAdminUser = false;
    private isInternUser = false;
    private isActiveDropdown = false;

    user: User;

    constructor(private authService: AuthService,
                private userService: UserService,
                private router: Router) {}

    ngOnInit() {
        const currentUser = this.authService.currentUser();

        if (currentUser) {
            this.isAdminUser = currentUser.role === "admin";
            this.isInternUser = currentUser.role != "freelancer";

            this.userService.getUserById(currentUser._id)
                .subscribe(
                    (user: User) => this.user = user,
                    error => console.log(error)
            );
        }
    }

    toggleDropdown(event) {
        event.preventDefault();
        this.isActiveDropdown = !this.isActiveDropdown;
    }

    closeDropdown() {
        this.isActiveDropdown = false;
    }

    logout() {
        this.authService.logout();
    }
}
