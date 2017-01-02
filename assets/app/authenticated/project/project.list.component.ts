import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../_services/project.service";
import { Router } from "@angular/router";
import { Project } from "../../_models/project.model";
import { ModalService } from "../../_services/modal.service";

@Component({
    selector: 'app-project-list',
    templateUrl: './project.list.template.html',
    providers: [ ProjectService ]
})

export class ProjectListComponent implements OnInit {
    deleteProjectModalIds = new Array<string>();
    projects: Project[];
    userRole: string;
    userId: string;

    constructor(private projectService: ProjectService,
                private router: Router,
                private modalService: ModalService) {}

    ngOnInit() {
        this.projectService.getProjects()
            .subscribe(
                (projects: Project[]) => {
                    this.projects = projects;
                    this.projects.forEach((project, index) => {
                        this.deleteProjectModalIds.push("deleteProjectModalId" + index);
                    });
                }
            );

        this.userRole = localStorage.getItem('role');
        this.userId = localStorage.getItem('userId');
    }

    convertPriority(priority: boolean) {
        if(priority) {
            return "high";
        } else {
            return "medium";
        }
    }

    showProject(project: Project) {
        this.router.navigate(['/usr/project/show', project._id]);
    }

    deleteProject(project: Project, index: number) {
        //var r = confirm("Do you want to delete this project?");
        //if(r == true) {
        this.deleteProjectModalIds.splice(index,1);
        this.projectService.deleteProject(project)
            .subscribe(
                result => console.log(result)
            );
    }
}
