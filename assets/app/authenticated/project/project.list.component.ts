import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../_services/project.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Project } from "../../_models/project.model";
import { ProjectTask } from "../../_models/project-task.model";
import { AuthService } from "../../_services/auth.service";
import { FilterService } from "../../_services/filter.service";

@Component({
    selector: 'app-project-list',
    templateUrl: './project.list.template.html',
    providers: [ ProjectService ],
    styleUrls: ['./project.list.style.scss']
})

export class ProjectListComponent implements OnInit {
    projects: Project[];
    tasks: ProjectTask[];
    activeTab = "projects";

    today: Date;

    filteredProjects: Project[] = [];

    constructor(private projectService: ProjectService,
                private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                private filterService: FilterService) {}

    ngOnInit() {
        this.today = new Date();
        this.projectService.getProjects()
            .subscribe((projects: Project[]) => {
                this.projects = projects;
                for(let project of this.projects) {
                    this.filteredProjects.push(project);
                }
                let filters = this.filterService.getFilters();
                for(let filter of filters) {
                    let checkbox = document.getElementById(filter);
                    if(checkbox) { checkbox.setAttribute("checked", "true"); }
                    this.applyFilter(filter);
                }
                this.orderProjects(this.filterService.getOrder());
            });
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

    deleteProjectTask(projectId, taskId) {
        this.projectService.deleteProjectTask(projectId, taskId)
            .subscribe(data => console.log(data));
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

    filterAfter(key: string) {
        let removeProjects = []
        for(let project of this.filteredProjects) {
            var expression;
            switch(key) {
                case ("own"):
                    expression = project.creator._id != this.authService.currentUser()._id;
                    break;
                case ("high"):
                    expression = !project.isPriority;
                    break;
                case ("current"):
                    expression = new Date(project.end) < this.today;
                    break;
                case ("past"):
                    expression = new Date(project.end) >= this.today;
                    break;
                default:
                    break;
            }
            if(expression) {
                removeProjects.push(project);
            }
        }
        for(let project of removeProjects) {
            this.filteredProjects.splice(this.filteredProjects.indexOf(project),1);
        }
    }

    applyFilter(key: string) {

        switch(key) {
            case ("own"):
                this.filterAfter("own");
                break;
            case("high"):
                this.filterAfter("high");
                break;
            case("current"):
                this.filterAfter("current");
                break;
            case("past"):
                this.filterAfter("past");
                break;
            default:
                break;
        }
    }

    filterProjects(key: string) {
        this.filteredProjects = [];
        for(let project of this.projects) {
            this.filteredProjects.push(project);
        }
        this.filterService.pushPopFilter(key);
        let applyFilters = this.filterService.getFilters();
        for(let key of applyFilters) {
            this.applyFilter(key);
        }
        this.orderProjects(this.filterService.getOrder());
    }

    orderProjects(key: string) {

        //dirty: deactivate other activated buttons
        document.getElementById("start-asc").classList.remove("order-button-active");
        document.getElementById("start-desc").classList.remove("order-button-active");
        document.getElementById("end-asc").classList.remove("order-button-active");
        document.getElementById("end-desc").classList.remove("order-button-active");
        document.getElementById("client-asc").classList.remove("order-button-active");
        document.getElementById("client-desc").classList.remove("order-button-active");

        document.getElementById(key).classList.add("order-button-active");

        this.filteredProjects.sort(function(a, b) {
            let expression;

            switch (key) {
                case ("start-asc"):
                    expression = new Date(a.start).valueOf() - new Date(b.start).valueOf();
                    break;
                case ("start-desc"):
                    expression = new Date(b.start).valueOf() - new Date(a.start).valueOf();
                    break;
                case ("end-asc"):
                    expression = new Date(a.end).valueOf() - new Date(b.end).valueOf();
                    break;
                case ("end-desc"):
                    expression = new Date(b.end).valueOf() - new Date(a.end).valueOf();
                    break;
                case ("client-asc"):
                    expression = a.client.localeCompare(b.client);
                    break;
                case ("client-desc"):
                    expression = -(a.client.localeCompare(b.client));
                    break;
            }
            return expression;
        })

        this.filterService.setOrder(key);
    }

}
