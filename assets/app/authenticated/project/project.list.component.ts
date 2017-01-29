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

    //used for filtering
    showOwnProjects: boolean = false;
    showNormalPrio: boolean = false;
    showHighPrio: boolean = false;
    showPastProjects: boolean = false;
    showCurrentProjects: boolean = false;

    notOwnProjects: Project[] = [];
    notNormalProjects: Project[] = [];
    notHighProjects: Project[] = [];
    notPastProjects: Project[] = [];
    notCurrentProjects: Project[] = [];

    filteredProjects: Project[];

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
                this.filteredProjects = projects;
                let filters = this.filterService.getFilters();
                for(let filter of filters) {
                    this.filterProjects(filter, false);
                }
                this.orderProjects(this.filterService.getOrder(), false);
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

    filterAfter(key: string, toggle: boolean, filterArray: Project[]) {
        if(toggle) {
            document.getElementById(key).setAttribute("checked", "true");
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
                    filterArray.push(project);
                }
            }
            for(let project of filterArray) {
                this.filteredProjects.splice(this.filteredProjects.indexOf(project),1);
            }
        } else {
            document.getElementById(key).setAttribute("checked", "false");
            for(let project of filterArray) {
                this.filteredProjects.push(project);
            }
            //clear filterArray
            for(var i = filterArray.length; i>0; i--) {
                filterArray.pop();
            }
        }
    }

    filterProjects(key: string, rememberFilter: boolean) {

        switch(key) {
            case ("own"):
                this.showOwnProjects = !this.showOwnProjects;
                this.filterAfter("own", this.showOwnProjects, this.notOwnProjects);
                break;
            case("high"):
                this.showHighPrio = !this.showHighPrio;
                this.filterAfter("high", this.showHighPrio, this.notHighProjects);
                break;
            case("current"):
                this.showCurrentProjects = !this.showCurrentProjects;
                this.filterAfter("current", this.showCurrentProjects, this.notCurrentProjects);
                break;
            case("past"):
                this.showPastProjects = !this.showPastProjects;
                this.filterAfter("past", this.showPastProjects, this.notPastProjects);
                break;
            default:
                break;
        }
        if(rememberFilter) {
            this.filterService.pushPopFilter(key);
        }
    }

    orderProjects(key: string, rememberOrder: boolean) {

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
                    console.log(expression);
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
        if(rememberOrder) {
            this.filterService.setOrder(key);
        }
    }

}
