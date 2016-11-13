import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { SkillService } from "./skill.service";
import { Skill } from "./skill.model";

@Component({
    selector: 'app-skill-input',
    templateUrl: './skill-input.template.html'
})
export class SkillInputComponent {
    skill: Skill;

    constructor(private skillService: SkillService) {}

    // onSubmit(form: NgForm) {
    //     // Create
    //     const skill = new Skill(form.value.name, form.value.rating);
    //     this.skillService.addSkill(skill)
    //         .subscribe(
    //             data => console.log(data),
    //             error => console.error(error)
    //         );
    //     }
    //     form.resetForm();
    // }
    //
    // onClear(form: NgForm) {
    //     this.skill = null;
    //     form.resetForm();
    // }

}