import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    template: `
        <header class="nav">
          <div class="nav-item"><a routerLink="/password">Set Password</a></div>
          <div class="nav-item"><a routerLink="/skills">Select Skills</a></div>
          <div class="nav-item"><a routerLink="/interests">Select Interests</a></div>
          <div class="nav-item"><a routerLink="/info">Add more Information</a></div>
          <div class="nav-item"><a routerLink="/profile">Preview Profile</a></div>
          <div class="nav-item"><a routerLink="/finish">Finish Onboarding</a></div>
        </header>
    `,
    styles: [`
        .nav {
            display: flex;
        }
    
        .nav-item {
            flex-grow: 1;
            text-align: center;
        } 
    `]

})
export class HeaderComponent {

}
