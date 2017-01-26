import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";

import { Skill } from "../../_models/skill.model";
import { SkillService } from "../../_services/skill.service";
import { ModalService } from "../../_services/modal.service";
import { AuthService } from "../../_services/auth.service";

@Component({
    selector: 'app-skill-list',
    templateUrl: './skill.list.template.html',
    styleUrls: ['skill.list.style.scss'],
    providers: [SkillService]
})
export class SkillListComponent implements OnInit {
    private deleteSkillModalIds = new Array<string>();
    private currentUserCanRemove = false;

    skills: Skill[];

    constructor(private skillService: SkillService,
                private authService: AuthService,
                private _flash: FlashMessagesService,
                private modalService: ModalService) {}

    ngOnInit() {
        const currentUser = this.authService.currentUser();

        this.skillService.getSkills()
            .subscribe(
                (skills: Skill[]) => {
                    this.skills = skills;
                    this.skills.forEach((skill, index) => {
                        this.deleteSkillModalIds.push("deleteSkillModalId" + index);
                    });
                }
            );

        if (currentUser) {
            this.currentUserCanRemove = currentUser.role === 'admin' || currentUser.role === 'user_creator';
        }
    }

    addSkill(skillInput: string): void {
        // Create
        this.skillService.addSkill(skillInput)
            .subscribe(
                data => {
                    this._flash.show("Skill successfully added", { cssClass: 'alert-success', timeout: 10000 });},
                error => {
                    this._flash.show(error.message, { cssClass: 'alert-danger', timeout: 10000 });}
            );
    }

    deleteSkill(skill: Skill, index: number) {
        this.skillService.deleteSkill(skill)
            .subscribe(
              data => {
                  this._flash.show("Skill successfully deleted", { cssClass: 'alert-success', timeout: 5000 });
                  this.deleteSkillModalIds.splice(index,1);
              },
              error => {this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });}
            );
    }

}