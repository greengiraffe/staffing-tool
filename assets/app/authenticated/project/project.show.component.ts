import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../../_services/project.service';
import { SkillService } from '../../_services/skill.service';

import { Project } from "../../_models/project.model";
import { Skill } from "../../_models/skill.model";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-project-show',
    templateUrl: 'project.show.template.html',
    providers: [ ProjectService, SkillService ]
})

export class ProjectShowComponent implements OnInit {

    project: Project;

    constructor(
        private projectService: ProjectService,
        private skillService: SkillService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) =>
                this.projectService.getProjectById(params['id']))
                .subscribe((project: Project) => {
                    this.project = project;
                    if (project.projectTasks)
                        this.convertSkillIdsToNames();

                });
    }

    convertSkillIdsToNames() {
        for (let task of this.project.projectTasks ) {
            for (let i in task.requiredSkills) {
                this.skillService.getSkillById(task.requiredSkills[i])
                    .subscribe((skill: Skill) => task.requiredSkills[i] = skill.name)
            }
        }
    }
}
