import { Component } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project.model';

@Component ({
    selector: 'app-project',
    template: `
      <h1>Project</h1>
      <input type="text" #input>
      <button type="button" (click)="createProject(input.value)">Create Project</button>
    `,
    providers: [ProjectService]
})

export class ProjectComponent {

    constructor(private projectService: ProjectService) {}

    createProject(name: string) {
        let project = new Project(name);
        this.projectService.createProject(project)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            )
    }
}
