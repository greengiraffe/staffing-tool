import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";

import { Project } from "../../_models/project.model";
import { ProjectService } from "../../_services/project.service";


@Component({
    selector: 'app-project-create',
    templateUrl: './project.create.template.html',
    providers: [ProjectService],
    styleUrls: ['project.create.style.scss']
})
export class ProjectCreateComponent implements OnInit {
    constructor(private ProjectService: ProjectService,
                private _flash: FlashMessagesService,
                private _fb: FormBuilder) {}

    projectForm: FormGroup;

    ngOnInit() {
        this.projectForm = this._fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            type: ['tentative', Validators.required],
            client: ['', Validators.required],
            budget: ['', Validators.required],
            expBudget: ['', Validators.required],
            isPriority: ['false', Validators.required],
            projectStart: ['', Validators.required],
            projectEnd: ['', Validators.required]
        })
    }

    onSubmit(form: FormGroup) {
        // Create
        const project = new Project(
            form['title'],
            form['description'],
            form['type'],
            form['client'],
            form['budget'],
            form['isPriority'],
            form['projectStart'],
            form['projectEnd'],
            form['expBudget']
        );
        this.ProjectService.createProject(project)
            .subscribe(
                data => {this._flash.show("Project successfully added", { cssClass: 'alert-success', timeout: 5000 });},
                error => {this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });}
            );
        form.reset();
    }
}
