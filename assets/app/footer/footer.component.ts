import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: `
      <div class="wrapper">
        <p>Made with ❤ at HTW Berlin and IXDS</p>
        <a>Github Link</a>
      </div>
    `,
    styleUrls: ['footer.style.scss']
})

export class FooterComponent {

    constructor() {}

}
