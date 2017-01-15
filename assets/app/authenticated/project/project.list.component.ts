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
    projects: Project[];
    sortType: string = 'end';

    constructor(private projectService: ProjectService,
                private router: Router,
                private modalService: ModalService) {}

    ngOnInit() {
        this.projectService.getProjects()
            .subscribe((projects: Project[]) => this.projects = projects);
    }

    deleteProject(project: Project) {
        this.projectService.deleteProject(project)
            .subscribe(
                result => console.log(result)
            );
    }

    toggleTabs(event, index) {
        let li = event.target;
        let activeLi = document.querySelectorAll('a[role="tab"]');
        for (var i = 0; i < activeLi.length; ++i) {
            activeLi[i].classList.remove("active");
            let divToHide = document.getElementById(activeLi[i].getAttribute('data-target'));
            divToHide.style.display = "none";
        }
        li.classList.add("active");
        let divToShow = document.getElementById(li.getAttribute('data-target'));
        divToShow.style.display = "block";
    }

}
