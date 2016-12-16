import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Project } from "../_models/project.model";

@Injectable()
export class ProjectService {
    private projects: Project[] = [];

    constructor(private http: Http) {}

    createProject(project: Project): Observable<{}> {
        console.log(project);
        const body = JSON.stringify(project);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post('http://localhost:3000/project', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getProjects(): Observable<{}> {
        return this.http.get('http://localhost:3000/project/list')
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
                        project.expbudget,
                        project._id
                    );
                    newProjects.push(newProject);
                }
                this.projects = newProjects;
                return newProjects
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getProjectById(projectId): Observable<{}> {
      return this.http.get('http://localhost:3000/project/' + projectId)
        .map((response: Response) => {
            const res = response.json();
            return new Project(
                res.title,
                res.description,
                res.type,
                res.client,
                res.budget,
                res.priority,
                res.start,
                res.end,
                res.expbudget,
                res._id
            );

        })
        .catch((error: Response) => Observable.throw(error.json()));
    }
}
