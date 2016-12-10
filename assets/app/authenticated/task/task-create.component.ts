import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Task } from "../../_models/task.model";
import { SkillService } from "../../_services/skill.service";
import { UserProfileEditService } from "../../_services/user-profile-edit.service";
import { Skill } from "../../_models/skill.model";

@Component({
    selector: 'app-task-create',
    templateUrl: 'task-create.template.html',
    styleUrls: ['task-create.styles.scss'],
    providers: [SkillService, UserProfileEditService]
})
export class TaskCreateComponent implements OnInit {

    task: Task;
    requiredSkills: Set<Skill>;

    constructor(private skillService: SkillService, private userProfileEditService: UserProfileEditService) {
        this.requiredSkills = new Set<Skill>();
    }

    ngOnInit() {
        this.userProfileEditService.skillAdded$
            .subscribe(skill => {
                this.addRequiredSkill(skill);
            });
    }

    addRequiredSkill(skill) {
        this.requiredSkills.add(skill);
        this.userProfileEditService.skillAdded(skill);
    }

    removeRequiredSkill(skill) {
        this.requiredSkills.delete(skill);
        this.userProfileEditService.removeSkill(skill);
    }

    addTask(form: NgForm) {
        // TODO
    }

}
