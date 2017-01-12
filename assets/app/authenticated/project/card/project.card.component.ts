import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../_models/project.model';
import { ModalService } from "../../../_services/modal.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../_services/auth.service";
import { User } from "../../../_models/user.model";

@Component({
    selector: 'app-project-card',
    templateUrl: 'project.card.template.html',
    styleUrls: ['project.card.style.scss']
})

export class CardComponent {

    @Input("project") project: Project;
    @Output("onDelete") onDelete = new EventEmitter();

    private currentUserCanDelete = false;
    private currentUserCanEdit = false;
    private deleteProjectModalId = "deleteProjectModal" + (0|Math.random()*6.04e7).toString(36);


    constructor(private modalService: ModalService, private authService: AuthService, private router: Router) {}

    ngOnInit() {
        const user = this.authService.currentUser();

        if (user) {
            this.currentUserCanDelete = user.role === "admin" || this.project.creator._id === user._id;
            this.currentUserCanEdit = user.role === "admin" || this.project.creator._id === user._id; // TODO assignees should be able to edit the project too
        }
    }

    showProject() {
        this.router.navigate(['/usr/project/show', this.project._id]);
    }

    deleteProject() {
        this.onDelete.emit(this.project);
        this.modalService.close(this.deleteProjectModalId)
    }
}
