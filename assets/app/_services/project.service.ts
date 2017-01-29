import { Http, Response, Headers } from "@angular/http";
import { AuthHttp } from 'angular2-jwt';
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Project } from "../_models/project.model";

@Injectable()
export class ProjectService {
    private projects: Project[] = [];

    constructor(private authHttp: AuthHttp) {}

    createProject(project: Project): Observable<{}> {
        const body = JSON.stringify(project);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.authHttp.post('http://localhost:3000/api/project', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updateProject(project: Project): Observable<{}> {
        const body = JSON.stringify(project);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.authHttp.put('http://localhost:3000/api/project', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updateProjectTask(projectId: string, projectTask: any) {
        const body = JSON.stringify(projectTask);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.authHttp.put('http://localhost:3000/api/project/task/' + projectId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteProjectTask(projectId: string, projectTaskId: string) {
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.authHttp.delete('http://localhost:3000/api/project/task/' + projectId + "/" + projectTaskId, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getProjects(): Observable<{}> {
        return this.authHttp.get('http://localhost:3000/api/project/list')
            .map((response: Response) => {
                const res = response.json();
                let newProjects: Project[] = [];
                for (let project of res) {
                    const newProject = new Project(
                        project.creator,
                        project.title,
                        project.description,
                        project.type,
                        project.client,
                        project.budget,
                        project.isPriority,
                        project.start,
                        project.end,
                        project.projectTasks,
                        project.expBudget,
                        project._id
                    );
                    newProjects.push(newProject);
                }
                this.projects = newProjects;
                return this.projects;
            })
            .catch((error: Response) =>  Observable.throw(error.json()));
    }

    getProjectById(projectId): Observable<{}> {
      return this.authHttp.get('http://localhost:3000/api/project/' + projectId)
        .map((response: Response) => {
            const res = response.json();
            return new Project(
                res.creator,
                res.title,
                res.description,
                res.type,
                res.client,
                res.budget,
                res.isPriority,
                res.start,
                res.end,
                res.projectTasks,
                res.expBudget,
                res._id
            );

        })
        .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteProject(project: Project) {
        this.projects.splice(this.projects.indexOf(project), 1);
        const body = JSON.stringify(project);
        return this.authHttp.delete('http://localhost:3000/api/project/' + project._id)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
