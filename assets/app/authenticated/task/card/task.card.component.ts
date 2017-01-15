import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectTask } from '../../../_models/project-task.model';
import { ModalService } from "../../../_services/modal.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../_services/auth.service";
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


    constructor(private modalService: ModalService, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        const user = this.authService.currentUser();

        if (user) {
            this.currentUserCanDelete = user.role == "admin" || this.project.creator._id == user._id;
            this.currentUserCanEdit = user.role == "admin" || this.project.creator._id == user._id;
        }
    }

    showProject() {
        this.router.navigate(['/usr/project/show', this.project._id]);
    }

    editTask() {
        // TODO show prefilled task.create modal
    }

    deleteTask() {
        this.onDelete.emit({
            task: this.task,
            project: this.project
        });
        this.modalService.close(this.deleteTaskModalId)
    }
}
