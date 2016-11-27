import { Component, OnInit } from "@angular/core";

import { Skill } from "../_models/skill.model";
import { SkillService } from "../_services/skill.service";

@Component({
    selector: 'app-skill-list',
    templateUrl: './skill.list.template.html',
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

    editSkill(skill: Skill) {
        // TODO
    }

    deleteSkill(skill: Skill) {
        // FIXME
        this.skillService.deleteSkill(skill)
            .subscribe(
                result => console.log(result)
            );
    }

}
