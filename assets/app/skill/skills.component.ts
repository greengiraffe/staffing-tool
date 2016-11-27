import { Component } from "@angular/core";
import {SkillService} from "../_services/skill.service";

@Component({
    selector: 'app-skills',
    template: `
        <h2>Skills</h2>
        <app-skill-create class="skill-create"></app-skill-create>
        <app-skill-list class="skill-list"></app-skill-list>
    `,
    providers: [SkillService],
    styleUrls: ['skills.style.scss']
})
export class SkillsComponent {

}
