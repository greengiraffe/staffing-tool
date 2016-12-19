import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.template.html'
})

export class NavComponent {

    constructor(private auth: AuthService) {}
}
