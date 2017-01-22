import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../_services/auth.service';
import { NavBarService } from "../_services/navbar.service";
import { UserService } from "../_services/user.service";
import { User } from "../_models/user.model";


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

    constructor(private authService: AuthService,
                private userService: UserService,
                private router: Router,
                private navbarService: NavBarService
                ) {}

    ngOnInit() {
        const currentUser = this.authService.currentUser();
        if(currentUser) {
            this.isAdminUser = currentUser.role === "admin";
            this.isInternUser = currentUser.role != "freelancer";
        }
        this.navbarService.getUserRole$.subscribe((user) => {
            if (user) {
                console.log(user.role);
                this.isAdminUser = user.role === "admin";
                this.isInternUser = user.role != "freelancer";
            }
        });
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
