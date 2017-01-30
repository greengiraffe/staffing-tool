import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectTask } from '../../../_models/project-task.model';
import { ModalService } from "../../../_services/modal.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../_services/auth.service";
import { ProjectService } from "../../../_services/project.service";
import { Project } from '../../../_models/project.model';
import { MatchService } from "../../../_services/match.service";
import { UserService } from "../../../_services/user.service";
import { RightsService } from "../../../_services/rights.service";

@Component({
    selector: 'app-task-card',
    templateUrl: 'task.card.template.html',
    styleUrls: ['task.card.style.scss']
})

export class TaskCardComponent {

    @Input("project") project: Project;
    @Input("task") task: ProjectTask;
    @Output("onDelete") onDelete = new EventEmitter();

    private currentUserCanDelete = false;
    private currentUserCanEdit = false;
    private currentUserIsInterested = false;
    private currentUserIsAssigned = false;
    private deleteTaskModalId = "deleteTaskModal" + (0 | Math.random() * 6.04e7).toString(36);
    private editTaskModalId = "editTaskModal" + (0 | Math.random() * 6.04e7).toString(36);
    private currentUser;

    matchValue: number;


    constructor(private modalService: ModalService,
                private authService: AuthService,
                private userService: UserService,
                private projectService: ProjectService,
                private rightsService: RightsService,
                private matchService: MatchService,
                private router: Router) {
    }

    ngOnInit() {
        this.currentUser = this.authService.currentUser();

        if (this.currentUser) {
            this.currentUserCanDelete = this.rightsService.canDeleteTask(this.project, this.currentUser);
            this.currentUserCanEdit = this.rightsService.canEditTask(this.project, this.currentUser);
            this.currentUserIsInterested = !!this.task.interestedUsers.find(user => user._id === this.currentUser._id);
            this.currentUserIsAssigned = !!this.task.assignedUsers.find(user => user._id === this.currentUser._id);

            this.userService.getUserSkills(this.currentUser._id).subscribe(result => {
                this.currentUser.userSkills = result;
                this.matchValue = this.matchService.getMatch(this.task.requiredSkills, result)
            })
        }
    }

    toggleInterest() {
        this.currentUserIsInterested = !this.currentUserIsInterested;

        if (this.currentUserIsInterested) {
            this.task.interestedUsers.push(this.currentUser);
        } else {
            let userIndex = this.task.interestedUsers.indexOf(this.currentUser);
            this.task.interestedUsers.splice(userIndex, 1)
        }

        // TODO use updateTask backend route (needs to be added to the projectService first)
        this.projectService.updateProject(this.project)
            .subscribe(data => console.log(data));
    }

    deleteTask() {
        this.onDelete.emit();
        this.project.projectTasks.splice(this.project.projectTasks.indexOf(this.task), 1);
        this.modalService.close(this.deleteTaskModalId)
    }

    updateTask(taskComponent) {
        const editedTask = new ProjectTask(
            taskComponent.taskForm.controls["title"]["_value"],
            taskComponent.taskForm.controls["description"]["value"],
            taskComponent.task.requiredSkills,
            taskComponent.taskForm.controls["status"]["value"],
            taskComponent.task.assignedUsers,
            taskComponent.task.interestedUsers,
            this.task._id
        );
        this.modalService.close(this.editTaskModalId);
        this.task = editedTask;
        this.projectService.updateProjectTask(this.project._id, this.task)
            .subscribe();
    }

    closeModal(modalId, event) {
        event.stopPropagation();
        this.modalService.close(modalId);
    }
}
