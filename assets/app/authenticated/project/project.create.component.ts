import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";

import { Project } from "../../_models/project.model";
import { ProjectService } from "../../_services/project.service";


@Component({
    selector: 'app-project-create',
    templateUrl: './project.create.template.html',
    providers: [ProjectService]
    // styleUrls: ['./project.create.style.scss']
})
export class ProjectCreateComponent {
    constructor(private ProjectService: ProjectService,
                private _flash: FlashMessagesService) {}

    onSubmit(form: NgForm) {
        // Create
        const project = new Project(
            form.value.title,
            form.value.description,
            form.value.type,
            form.value.client,
            form.value.budget,
            form.value.priority,
            form.value.start,
            form.value.end,
            form.value.expbudget
        );
        this.ProjectService.createProject(project)
            .subscribe(
                data => {this._flash.show("Project successfully added", { cssClass: 'alert-success', timeout: 5000 });},
                error => {this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });}
            );
        form.reset();
    }
}
