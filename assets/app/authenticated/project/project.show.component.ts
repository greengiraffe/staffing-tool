import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../../_services/project.service';

import { Project } from "../../_models/project.model";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-project-show',
    templateUrl: 'project.show.template.html',
    providers: [ ProjectService ]
})

export class ProjectShowComponent implements OnInit {

    project: Project;

    constructor(
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        console.log("show");
        this.route.params
            .switchMap((params: Params) =>
                this.projectService.getProjectById(params['id']))
                .subscribe((project: Project) => this.project = project);
    }
}
