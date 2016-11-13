import { Component } from "@angular/core";

@Component({
    selector: 'app-skills',
    template: `
        <div class="row">
            <app-skill-input></app-skill-input>
        </div>
        <hr>
        <div class="row">
            <app-skill-list></app-skill-list>
        </div>
    `
})
export class SkillsComponent {

}