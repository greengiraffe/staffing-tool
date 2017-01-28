import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../_models/project.model';
import { ModalService } from "../../../_services/modal.service";
import { AuthService } from "../../../_services/auth.service";
import { RightsService } from "../../../_services/rights.service";

@Component({
    selector: 'app-project-card',
    templateUrl: 'project.card.template.html',
    styleUrls: ['project.card.style.scss']
})

export class ProjectCardComponent {

    @Input("project") project: Project;
    @Output("onDelete") onDelete = new EventEmitter();

    private currentUserCanDelete = false;
    private currentUserCanEdit = false;
    private deleteProjectModalId = "deleteProjectModal" + (0|Math.random()*6.04e7).toString(36);


    constructor(private modalService: ModalService,
                private rightsService: RightsService,
                private authService: AuthService) {}

    ngOnInit() {
        const user = this.authService.currentUser();

        if (user) {
            this.currentUserCanDelete = this.rightsService.canDeleteProject(this.project, user);
            this.currentUserCanEdit = this.rightsService.canEditProject(this.project, user);
        }
    }

    deleteProject() {
        this.onDelete.emit(this.project);
        this.modalService.close(this.deleteProjectModalId)
    }
}
