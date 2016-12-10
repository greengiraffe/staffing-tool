import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Task } from "../../_models/task.model";
import { SkillService } from "../../_services/skill.service";
import { SkillSearchService } from "../../_services/skill-search.service";
import { Skill } from "../../_models/skill.model";

@Component({
    selector: 'app-task-create',
    templateUrl: 'task-create.template.html',
    styleUrls: ['task-create.styles.scss'],
    providers: [SkillService, SkillSearchService]
})
export class TaskCreateComponent implements OnInit, OnDestroy {

    task: Task;
    requiredSkills: Set<Skill>;
    skillSearchServiceSubscription;

    constructor(private skillService: SkillService, private skillSearchService: SkillSearchService) {
        this.requiredSkills = new Set<Skill>();
    }

    ngOnInit() {
        this.skillSearchServiceSubscription = this.skillSearchService.skillAdded$
            .subscribe(skill => {
                this.addRequiredSkill(skill);
            });
    }

    addRequiredSkill(skill) {
        this.requiredSkills.add(skill);
        this.skillSearchService.skillAdded(skill);
    }

    removeRequiredSkill(skill) {
        this.requiredSkills.delete(skill);
        this.skillSearchService.removeSkill(skill);
    }

    addTask(form: NgForm) {
        // TODO
    }

    ngOnDestroy() {
        // Prevent memory leaks
        this.skillSearchServiceSubscription.unsubscribe();
    }

}
