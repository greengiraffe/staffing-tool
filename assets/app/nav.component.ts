import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
    selector: 'app-nav',
    template: `
      <nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
        <a routerLink="/home" class="navbar-brand">
          <i class="fa fa-home" aria-hidden="true"></i>
           IXDS Staffingtool
        </a>
        <ul class="nav navbar-nav">
          <li class="nav-item"><a class="nav-link" href='#' (click)="auth.logout()">Logout</a></li>
        </ul>
      </nav>
    `,
})

export class NavComponent {

    constructor(private auth: AuthService) {}
}
