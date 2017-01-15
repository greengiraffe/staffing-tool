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
    private deleteTaskModalId = "deleteTaskModal" + (0 | Math.random() * 6.04e7).toString(36);
    private user;
    private isInterested: boolean = false;


    constructor(private modalService: ModalService, private authService: AuthService, private projectService: ProjectService, private router: Router) {
    }

    ngOnInit() {
        this.user = this.authService.currentUser();

        if (this.user) {
            this.currentUserCanDelete = this.user.role == "admin" || this.project.creator._id == this.user._id;
            this.currentUserCanEdit = this.user.role == "admin" || this.project.creator._id == this.user._id;
        }

        for (var i = 0; i < this.task.interestedUsers.length; ++i) {
            if(this.task.interestedUsers[i]._id === this.user._id) {
                this.isInterested = true;
                return;
            }
        }
    }

    showProject() {
        this.router.navigate(['/usr/project/show', this.project._id]);
    }

    editTask() {
        // TODO show prefilled task.create modal
    }

    addInterestedUser(event) {
        let star = event.target;
        if (star.classList.contains("fa-star-o")) {
            star.classList.remove("fa-star-o");
            star.classList.add("fa-star");
            this.task.interestedUsers.push(this.user);
        } else {
            star.classList.remove("fa-star");
            star.classList.add("fa-star-o");
            this.task.interestedUsers.splice(this.user);
        }
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
