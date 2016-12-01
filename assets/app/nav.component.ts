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
          <li class="nav-item active"><a class="nav-link" routerLink="home">Dashboard</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="home">My Tasks</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="home">All Projects</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="home">Add Project</a></li>
          <!-- HR only -->
          <!-- later located under menue point "HR" -->
          <li class="nav-item"><a class="nav-link" routerLink="skill-manage">Manage Skills</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="usr/create">Add User</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="home">Manage Users</a></li>
          <!-- Owner only -->
          <li class="nav-item"><a class="nav-link" routerLink="home">My Projects</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="home">Logout</a></li>
        </ul>
      </nav>
    `,
})

export class NavComponent {

    constructor(private auth: AuthService) {}
}
