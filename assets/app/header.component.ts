import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    template: `
        <header class="nav">
          <div class="nav-item"><a routerLink="onboarding/password">Set Password</a></div>
          <div class="nav-item"><a routerLink="onboarding/skills">Select Skills</a></div>
          <div class="nav-item"><a routerLink="onboarding/interests">Select Interests</a></div>
          <div class="nav-item"><a routerLink="onboarding/info">Add more Information</a></div>
          <div class="nav-item"><a routerLink="onboarding/profile">Preview Profile</a></div>
          <div class="nav-item"><a routerLink="onboarding/finish">Finish Onboarding</a></div>
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
