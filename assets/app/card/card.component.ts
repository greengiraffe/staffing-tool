import { Component , Input } from '@angular/core';
import { Project } from '../_models/project.model';

@Component({
    selector: 'app-card',
    templateUrl: 'card.template.html',
    styleUrls: ['card.style.scss']
})

export class CardComponent {

    @Input("title") title: string;
    @Input("desc") desc: string;
    @Input("date") date: Date;

    constructor() {}
}
