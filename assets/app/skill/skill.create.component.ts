import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { SkillService } from "../_services/skill.service";
import { Skill } from "../_models/skill.model";

@Component({
    selector: 'app-skill-create',
    templateUrl: './skill.create.template.html',
    providers: [SkillService]
})
export class SkillCreateComponent {
    constructor(private skillService: SkillService) {}

    onSubmit(form: NgForm) {
        // Create
        const skill = new Skill(form.value.name, form.value.rating);
        this.skillService.addSkill(skill)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        form.resetForm();
    }

    // onClear(form: NgForm) {
    //     this.skill = null;
    //     form.resetForm();
    // }

}