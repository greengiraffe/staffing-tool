import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app.template.html',
    styleUrls: ['../styles/main.scss'],
    encapsulation: ViewEncapsulation.None  // Make styles globally available
})

export class AppComponent {

}
