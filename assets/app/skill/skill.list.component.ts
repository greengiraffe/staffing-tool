import { Component, OnInit } from "@angular/core";

import { Skill } from "../_models/skill.model";
import { SkillService } from "../_services/skill.service";

@Component({
    selector: 'app-skill-list',
    templateUrl: './skill.list.template.html',
    providers: [SkillService]
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