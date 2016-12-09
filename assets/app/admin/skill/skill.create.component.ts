import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { NgForm } from "@angular/forms";

import { Skill } from "../../_models/skill.model";
import { SkillService } from "../../_services/skill.service";


@Component({
    selector: 'app-skill-create',
    templateUrl: './skill.create.template.html',
})
export class SkillCreateComponent {
    constructor(private skillService: SkillService,
                private _flash: FlashMessagesService) {}

    onSubmit(form: NgForm) {
        // Create
        const skill = new Skill(form.value.name, form.value.rating);
        this.skillService.addSkill(skill)
            .subscribe(
                //data => console.log(data),
                data => {this._flash.show("Skill successfully added", { cssClass: 'alert-success', timeout: 5000 });},
                error => {this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });}
            );
        form.resetForm();
    }

    // onClear(form: NgForm) {
    //     this.skill = null;
    //     form.resetForm();
    // }

}
