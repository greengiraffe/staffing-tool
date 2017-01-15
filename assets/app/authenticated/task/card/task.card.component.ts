import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectTask } from '../../../_models/project-task.model';
import { ModalService } from "../../../_services/modal.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../_services/auth.service";
import { ProjectService } from "../../../_services/project.service";
import { Project } from '../../../_models/project.model';

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
    private currentUser;


    constructor(private modalService: ModalService, private authService: AuthService, private projectService: ProjectService, private router: Router) {
    }

    ngOnInit() {
        this.currentUser = this.authService.currentUser();

        if (this.currentUser) {
            this.currentUserCanDelete = this.currentUser.role === "admin" || this.project.creator._id === this.currentUser._id;
            this.currentUserCanEdit = this.currentUser.role === "admin" || this.project.creator._id === this.currentUser._id;
            this.currentUserIsInterested = !!this.task.interestedUsers.find(user => user._id === this.currentUser._id);
            this.currentUserIsAssigned = !!this.task.assignedUsers.find(user => user._id === this.currentUser._id);
        }

        console.log(this.currentUser.fullName)
    }

    showProject() {
        this.router.navigate(['/usr/project/show', this.project._id]);
    }

    editTask() {
        // TODO show prefilled task.create modal
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
        this.onDelete.emit({
            task: this.task,
            project: this.project
        });
        this.modalService.close(this.deleteTaskModalId)
    }
}
