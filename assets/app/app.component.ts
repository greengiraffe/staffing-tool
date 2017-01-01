import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app.template.html',
    styleUrls: ['app.style.scss'],
    encapsulation: ViewEncapsulation.None  // Make styles globally available
})

export class AppComponent {

}
