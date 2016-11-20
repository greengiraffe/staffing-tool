import { Component } from "@angular/core";
import {SkillService} from "../_services/skill.service";

@Component({
    selector: 'app-skills',
    template: `
        <div class="row">
            <app-skill-create></app-skill-create>
        </div>
        <hr>
        <div class="row">
            <app-skill-list></app-skill-list>
        </div>
    `,
    providers: [SkillService]
})
export class SkillsComponent {

}