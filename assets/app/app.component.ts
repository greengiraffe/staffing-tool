import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'my-app',
    templateUrl: 'app.template.html',
    styleUrls: ['../styles/main.scss'],
    encapsulation: ViewEncapsulation.None  // Make styles globally available
})

export class AppComponent {

    constructor(private router: Router) {}

}
