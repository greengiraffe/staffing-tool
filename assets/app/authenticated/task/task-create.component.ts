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

    @Input('task') task: ProjectTask = new ProjectTask(null,null,[],[]);

    skillSearchServiceSubscription;

    constructor(private skillService: SkillService, private skillSearchService: SkillSearchService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.skillSearchServiceSubscription = this.skillSearchService.skillAdded$
            .subscribe(skill => {
                this.addRequiredSkill(skill);
            });

        this.taskForm = this.fb.group({
            title: [this.task.title, Validators.required],
            description: [this.task.description, Validators.required]
        });
    }

    addRequiredSkill(skill: Skill) {
        this.task.requiredSkills.push(skill);
        this.skillSearchService.skillAdded(skill);
    }

    removeRequiredSkill(skill: Skill) {
        this.task.requiredSkills.splice(this.task.requiredSkills.indexOf(skill), 1);
        this.skillSearchService.removeSkill(skill);
    }

    setSelectedSkills(skills: Skill[]) {
        this.skillSearchService.resetSearch();
        for (let skill of skills) {
            this.addRequiredSkill(skill);
        }
    }

    resetForm() {
        this.taskForm.reset();
        this.skillSearchService.resetSearch();
        this.task = new ProjectTask(null,null,[],[]);
    }

    ngOnDestroy() {
        // Prevent memory leaks
        this.skillSearchServiceSubscription.unsubscribe();
    }

}
