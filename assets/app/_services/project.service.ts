import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Project } from '../_models/project.model';
import { Observable } from "rxjs";


@Injectable()
export class ProjectService {

    constructor(private http: Http) {}

    createProject(project: Project): Observable<{}> {
        console.log(project);
        const body = JSON.stringify(project);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post('http://localhost:3000/project', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}

