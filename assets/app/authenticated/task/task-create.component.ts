import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SkillService } from "../../_services/skill.service";
import { SkillSearchService } from "../../_services/skill-search.service";
import { Skill } from "../../_models/skill.model";
import { ProjectTask } from "../../_models/project-task.model";

@Component({
    selector: 'app-task-create',
    templateUrl: 'task-create.template.html',
    styleUrls: ['task-create.styles.scss'],
    providers: [SkillService, SkillSearchService]
})
export class TaskCreateComponent implements OnInit, OnDestroy {

    taskForm: FormGroup;

    @Input('task') task: ProjectTask = new ProjectTask(null,null,[]);
    skillSearchServiceSubscription;
    private requiredSkills = new Array<Skill>();

    constructor(private skillService: SkillService, private skillSearchService: SkillSearchService,
                private fb: FormBuilder) {
        /*for (let skillId of this.task.requiredSkills) {
            this.skillSearchService.addRequiredSkill(skill);
            this.skillSearchService.removeSkill(skill);
        }*/
    }

    ngOnInit() {
        this.skillSearchServiceSubscription = this.skillSearchService.skillAdded$
            .subscribe(skill => {
                this.addRequiredSkill(skill);
            });

        this.taskForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    addRequiredSkill(skill: Skill) {
        this.task.requiredSkills.push(skill.skillId);
        this.requiredSkills.push(skill);
        this.skillSearchService.skillAdded(skill);
    }

    removeRequiredSkill(skill: Skill) {
        this.task.requiredSkills.splice(this.task.requiredSkills.indexOf(skill.skillId), 1);
        this.requiredSkills.splice(this.requiredSkills.indexOf(skill), 1);
        this.skillSearchService.removeSkill(skill);
    }

    reset() {
        this.task = new ProjectTask(null,null,[]);
        for (let skill of this.requiredSkills) {
            this.skillSearchService.removeSkill(skill);
        }
        this.requiredSkills = new Array<Skill>();
    }

    ngOnDestroy() {
        // Prevent memory leaks
        this.skillSearchServiceSubscription.unsubscribe();
    }

}
