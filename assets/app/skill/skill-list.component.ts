import { Component, OnInit } from "@angular/core";

import { Skill } from "../_models/skill.model";
import { SkillService } from "../_services/skill.service";

@Component({
    selector: 'app-skill-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-skill
                   [skill]="skill"
                    *ngFor="let skill of skills"></app-skill>
        </div>
    `
})
export class SkillListComponent implements OnInit {
    skills: Skill[];

    constructor(private skillService: SkillService) {}

    ngOnInit() {
        this.skillService.getSkills()
            .subscribe(
                (skills: Skill[]) => {
                    this.skills = skills;
                }
            );
    }
}