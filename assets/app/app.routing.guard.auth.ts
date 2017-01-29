import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (!this.authService.loggedIn()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
