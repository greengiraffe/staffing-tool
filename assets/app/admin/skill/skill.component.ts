import { Component, Input } from "@angular/core";

import { Skill } from "../../_models/skill.model";
import { SkillService } from "../../_services/skill.service";


@Component({
    selector: 'app-skill',
    templateUrl: 'skill.template.html'
})
export class SkillComponent {
    @Input() skill: Skill;

    constructor() {}

    /*onDelete() {
        this.skillService.deleteSkill(this.skill)
            .subscribe(
                result => console.log(result)
            );
    }*/
}