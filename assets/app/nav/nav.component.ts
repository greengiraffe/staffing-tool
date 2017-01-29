import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../_services/auth.service';
import { NavBarService } from "../_services/navbar.service";


@Component({
    selector: 'app-nav',
    templateUrl: 'nav.template.html',
    styleUrls: ['nav.style.scss'],
})

export class NavComponent implements OnInit {
    private isAdminUser = false;
    private isInternalUser = false;
    private isUserCreator = false;

    constructor(private authService: AuthService,
                private router: Router,
                private navbarService: NavBarService
                ) {}

    ngOnInit() {
        const currentUser = this.authService.currentUser();
        if(currentUser) {
            this.isAdminUser = currentUser.role === "admin";
            this.isInternalUser = currentUser.role != "freelancer";
            this.isUserCreator = currentUser.role === "user_creator"
        }
        this.navbarService.getUserRole$.subscribe((user) => {
            if (user) {
                this.isAdminUser = user.role === "admin";
                this.isInternalUser = user.role != "freelancer";
                this.isUserCreator = user.role === "user_creator";
            }
        });
    }

    logout() {
        this.authService.logout();
    }
}
