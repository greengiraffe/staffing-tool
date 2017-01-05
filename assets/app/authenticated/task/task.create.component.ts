import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SkillService } from "../../_services/skill.service";
import { SkillSearchService } from "../../_services/skill-search.service";
import { Skill } from "../../_models/skill.model";
import { ProjectTask } from "../../_models/project-task.model";
import { User } from "../../_models/user.model";
import { UserSearchService } from "../../_services/user.search.service";

@Component({
    selector: 'app-task-create',
    templateUrl: 'task.create.template.html',
    styleUrls: ['task.create.styles.scss'],
    providers: [SkillService,
                SkillSearchService,
                UserSearchService]
})
export class TaskCreateComponent implements OnInit, OnDestroy {

    taskForm: FormGroup;

    @Input('task') task: ProjectTask = new ProjectTask(null,null,[],[]);

    skillSearchServiceSubscription;
    userSearchServiceSubscription;

    constructor(private skillService: SkillService,
                private skillSearchService: SkillSearchService,
                private userSearchService: UserSearchService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.skillSearchServiceSubscription = this.skillSearchService.skillAdded$
            .subscribe(skill => {
                this.addRequiredSkill(skill);
            });

        this.userSearchServiceSubscription = this.userSearchService.userAdded$
            .subscribe(user => {
                this.addAssignedUser(user);
            })

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

    addAssignedUser(user: User){
        this.task.assignedUsers.push(user);
        this.userSearchService.userAdded(user);
    }

    removeAssignedUser(user: User){
        this.task.assignedUsers.splice(this.task.assignedUsers.indexOf(user), 1);
        this.userSearchService.userRemoved(user);
    }

    resetForm() {
        this.taskForm.reset();
        this.skillSearchService.resetSearch();
        this.userSearchService.resetSearch();
        this.task = new ProjectTask(null,null,[],[]);
    }

    ngOnDestroy() {
        // Prevent memory leaks
        this.skillSearchServiceSubscription.unsubscribe();
        this.userSearchServiceSubscription.unsubscribe();
    }

}
