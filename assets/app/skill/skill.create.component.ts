import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";

import { SkillService } from "../_services/skill.service";
import { Skill } from "../_models/skill.model";

@Component({
    selector: 'app-skill-create',
    templateUrl: './skill.create.template.html',
})
export class SkillCreateComponent {
    constructor(private skillService: SkillService,
    private _flashMessagesService: FlashMessagesService) {}

    onSubmit(form: NgForm) {
        // Create
        const skill = new Skill(form.value.name, form.value.rating);
        this.skillService.addSkill(skill)
            .subscribe(
                //data => console.log(data),
                data => {this._flashMessagesService.show("Skill successfully added", { cssClass: 'alert-success', timeout: 5000 });},
                error => {this._flashMessagesService.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });}
            );
        form.resetForm();
    }

    // onClear(form: NgForm) {
    //     this.skill = null;
    //     form.resetForm();
    // }

}
