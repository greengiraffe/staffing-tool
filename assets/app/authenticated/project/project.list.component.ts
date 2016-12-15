import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../_services/project.service";

import { Project } from "../../_models/project.model";

@Component({
    selector: 'app-project-list',
    templateUrl: './project.list.template.html',
    providers: [ProjectService]
})

export class ProjectListComponent implements OnInit {
    projects: Project[];

    constructor(private projectService: ProjectService) {}

    ngOnInit() {
        this.projectService.getProjects()
            .subscribe(
                (projects: Project[]) => {
                    this.projects = projects;
                    console.log(this.projects);
                }
            );
    }

    convertPriority(priority: boolean) {
        if(priority) {
            return "high";
        } else {
            return "medium";
        }
    }
}