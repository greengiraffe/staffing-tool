import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../_services/project.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Project } from "../../_models/project.model";
import { ProjectTask } from "../../_models/project-task.model";
import { AuthService } from "../../_services/auth.service";

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

    today: Date;

    showOwnProjects: boolean = false;
    showNormalPrio: boolean = false;
    showHighPrio: boolean = false;
    showPastProjects: boolean = false;
    showCurrentProjects: boolean = false;
    showConfirmedStatus: boolean = false;
    showTentativeStatus: boolean = false;
    showInternalStatus: boolean = false;

    notOwnProjects: Project[] = [];
    notNormalProjects: Project[] = [];
    notHighProjects: Project[] = [];
    notPastProjects: Project[] = [];
    notCurrentProjects: Project[] = [];
    notConfirmedProjects: Project[] = [];
    notTentativeProjects: Project[] = [];
    notInternalProjects: Project[] = [];

    filteredProjects: Project[];

    constructor(private projectService: ProjectService,
                private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService) {}

    ngOnInit() {
        this.today = new Date();
        this.projectService.getProjects()
            .subscribe((projects: Project[]) => {
                this.projects = projects;
                this.filteredProjects = projects;
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

    togglePastProjects() {
        this.showPastProjects = !this.showPastProjects;
        let pastProjects = <NodeListOf<HTMLElement>>document.querySelectorAll('.past');
        for (var i = 0; i < pastProjects.length; ++i) {
            pastProjects[i].style.display = this.showPastProjects ? "block" : "none";
        }
    }

    filterAfter(key: string, toggle: boolean, filterArray: Project[]) {
        if(toggle) {
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
                        expression = new Date(project.end) >= this.today;
                        break;
                    case ("past"):
                        expression = new Date(project.end) < this.today;
                        break;
                    //TODO filter projects after status
                    case ("confirmed"):
                        break;
                    case ("tentative"):
                        break;
                    case ("internal"):
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
            for(let project of filterArray) {
                this.filteredProjects.push(project);
            }
            //clear filterArray
            for(var i = filterArray.length; i>0; i--) {
                filterArray.pop();
            }
        }
    }

    filterProjects(key) {
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
            case("confirmed"):
                this.showConfirmedStatus = !this.showConfirmedStatus;
                this.filterAfter("confirmed", this.showConfirmedStatus, this.notConfirmedProjects);
                break;
            case("tentative"):
                this.showTentativeStatus = !this.showTentativeStatus;
                this.filterAfter("tentative", this.showTentativeStatus, this.notTentativeProjects);
                break;
            case("internal"):
                this.showInternalStatus = !this.showInternalStatus;
                this.filterAfter("internal", this.showInternalStatus, this.notInternalProjects);
                break;
            default:
                break;
        }
    }
}
