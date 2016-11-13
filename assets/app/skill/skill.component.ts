import { Component, Input } from "@angular/core";

import { Skill } from "./skill.model";
import { SkillService } from "./skill.service";

@Component({
    selector: 'app-skill',
    templateUrl: './skill.template.html'
})
export class SkillComponent {
    @Input() skill: Skill;

    constructor(private skillService: SkillService) {}

    onDelete() {
        this.skillService.deleteSkill(this.skill)
            .subscribe(
                result => console.log(result)
            );
    }
}