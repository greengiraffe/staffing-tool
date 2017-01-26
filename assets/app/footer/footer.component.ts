import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: `
      <div class="wrapper">
        <p>Made with ❤ at <a href="https://www.htw-berlin.de">HTW Berlin</a> and <a href="https://www.ixds.com/">IXDS</a></p>
        <p>Fork it on <a href="https://github.com/greengiraffe/ixds-staffing">Github</a></p>
      </div>
    `,
    styleUrls: ['footer.style.scss']
})

export class FooterComponent {

    constructor() {}

}
