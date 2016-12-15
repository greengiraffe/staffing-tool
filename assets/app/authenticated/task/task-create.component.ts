import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { SkillService } from "../../_services/skill.service";
import { SkillSearchService } from "../../_services/skill-search.service";
import { Skill } from "../../_models/skill.model";
import {ProjectTask} from "../../_models/project-task.model";

@Component({
    selector: 'app-task-create',
    templateUrl: 'task-create.template.html',
    styleUrls: ['task-create.styles.scss'],
    providers: [SkillService, SkillSearchService]
})
export class TaskCreateComponent implements OnInit, OnDestroy {

    @Input('task') task: ProjectTask = new ProjectTask(null,null,[]);
    skillSearchServiceSubscription;
    private requiredSkills = new Array<Skill>();

    constructor(private skillService: SkillService, private skillSearchService: SkillSearchService) { }

    ngOnInit() {
        this.skillSearchServiceSubscription = this.skillSearchService.skillAdded$
            .subscribe(skill => {
                this.addRequiredSkill(skill);
            });
    }

    addRequiredSkill(skill: Skill) {
        this.task.requiredSkills.push(skill.skillId);
        this.requiredSkills.push(skill);
        this.skillSearchService.skillAdded(skill);
    }

    removeRequiredSkill(skill: Skill) {
        this.task.requiredSkills.slice(this.task.requiredSkills.indexOf(skill.skillId), 1);
        this.requiredSkills.slice(this.requiredSkills.indexOf(skill), 1);
        this.skillSearchService.removeSkill(skill);
    }

    ngOnDestroy() {
        // Prevent memory leaks
        this.skillSearchServiceSubscription.unsubscribe();
    }

}
