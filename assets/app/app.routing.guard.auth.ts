import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    canActivate() {
        return this.authService.loggedIn();
    }
}
//todo
