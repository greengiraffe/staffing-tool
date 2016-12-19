import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";

import { Skill } from "../../_models/skill.model";
import { SkillService } from "../../_services/skill.service";


@Component({
    selector: 'app-skill-list',
    templateUrl: './skill.list.template.html',
})
export class SkillListComponent implements OnInit {
    skills: Skill[];

    constructor(private skillService: SkillService,
    private _flash: FlashMessagesService) {}

    ngOnInit() {
        this.skillService.getSkills()
            .subscribe(
                (skills: Skill[]) => {
                    this.skills = skills;
                }
            );
    }

    deleteSkill(skill: Skill) {
        this.skillService.deleteSkill(skill)
            .subscribe(
              // data => {this._flash.show("Skill successfully deleted", { cssClass: 'alert-success', timeout: 5000 });},
              // error => {this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });}
            );
    }

}
