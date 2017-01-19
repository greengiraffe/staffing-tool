import { Component } from "@angular/core";

import { SkillService } from "../../_services/skill.service";

@Component({
    selector: 'app-skills',
    template: `
        <div class="page-wrapper">
            <div class="content-wrapper">
                <h1>Skills</h1>
                <app-skill-create class="skill-create"></app-skill-create>
                <app-skill-list class="skill-list"></app-skill-list>
            </div>
        </div>
    `,
    providers: [SkillService],
    styleUrls: ['skills.style.scss']
})
export class SkillsComponent {

}
