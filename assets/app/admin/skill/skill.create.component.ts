import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { FormGroup, Form, FormControl, Validators } from "@angular/forms";

import { Skill } from "../../_models/skill.model";
import { SkillService } from "../../_services/skill.service";


@Component({
    selector: 'app-skill-create',
    templateUrl: './skill.create.template.html',
})
export class SkillCreateComponent implements OnInit {
    skillForm: FormGroup;

    constructor(private skillService: SkillService,
                private _flash: FlashMessagesService) {}

    ngOnInit() {
        this.skillForm = new FormGroup({
            skillName: new FormControl('', Validators.required)
        })
    }

    onSubmit(form: FormGroup) {
        // Create
        const skill = new Skill(form['skillName']);
        this.skillService.addSkill(skill)
            .subscribe(
                data => {
                    this._flash.show("Skill successfully added", { cssClass: 'alert-success', timeout: 10000 });},
                error => {
                    this._flash.show(error.message, { cssClass: 'alert-danger', timeout: 10000 });}
            );
    }
}
