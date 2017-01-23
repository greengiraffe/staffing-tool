import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../_services/project.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Project } from "../../_models/project.model";
import { ModalService } from "../../_services/modal.service";
import { ProjectTask } from "../../_models/project-task.model";

@Component({
    selector: 'app-project-list',
    templateUrl: './project.list.template.html',
    providers: [ ProjectService ],
    styleUrls: ['./project.list.style.scss']
})

export class ProjectListComponent implements OnInit {
    projects: Project[];
    tasks: ProjectTask[];
    sortType: string = 'end';
    activeTab = "projects";
    showPastProjects: boolean = false;

    constructor(private projectService: ProjectService,
                private router: Router,
                private route: ActivatedRoute,
                private modalService: ModalService) {}

    ngOnInit() {
        this.projectService.getProjects()
            .subscribe((projects: Project[]) => this.projects = projects);
        this.route.params
            .subscribe(params => {
                this.activeTab = params['type']
            })
    }

    deleteProject(project: Project) {
        this.projectService.deleteProject(project)
            .subscribe(
                result => console.log(result)
            );
    }

    deleteProjectTask(taskAndProject) {
        let task = taskAndProject.task;
        let project = taskAndProject.project;
        // TODO delete
    }

    toggleTabs() {
        this.activeTab = this.activeTab === "projects" ? "task" : "projects";
    }

    /**
     * Let Angular track the projects to avoid rebuilding the whole
     * DOM when a project has been updated or deleted.
     * Ref: https://angular.io/docs/ts/latest/guide/template-syntax.html#!#ngFor)
     */
    trackByProjects(index: number, project: Project) {
        return project._id;
    }

    showTab(event) {
        event.preventDefault();
        let a = event.target;
        let destinationURL = a.getAttribute("routerLink");
        this.router.navigate([destinationURL]);
    }

    togglePastProjects() {
        this.showPastProjects = !this.showPastProjects;
        let pastProjects = <NodeListOf<HTMLElement>>document.querySelectorAll('.past');
        for (var i = 0; i < pastProjects.length; ++i) {
            pastProjects[i].style.display = this.showPastProjects ? "block" : "none";
            console.log(pastProjects[i])
        }
    }
}
