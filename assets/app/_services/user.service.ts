import { Injectable } from "@angular/core";
import { Http, Headers, Response, ResponseContentType } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "../_models/user.model";
import { Project } from "../_models/project.model";
import { ProjectTask } from "../_models/project-task.model";

@Injectable()
export class UserService {
    private users: User[] = [];
    private ownedProjects: Project[] = [];
    private assignedTasks: ProjectTask[] = [];

    constructor(private http: Http) {}

    createUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/api/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getUsers(): Observable<{}> {
        return this.http.get('http://localhost:3000/api/user/list')
            .map((response: Response) => {
                const res = response.json();
                let newUsers: User[] = [];
                for (let user of res) {
                    newUsers.push(new User(
                        user.email,
                        user.password,
                        user.role,
                        user.location,
                        user.firstName,
                        user.lastName,
                        user.phone,
                        user.userSkills,
                        user._id)
                    );
                }
                this.users = newUsers;
                return newUsers;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getUserById(userId): Observable<{}> {
      return this.http.get('http://localhost:3000/api/user/' + userId)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    getProjectsCreatedByUser(userId): Observable<{}> {
        return this.http.get('http://localhost:3000/api/user/projects/' + userId)
            .map((response: Response) => {
                const res = response.json();
                let ownedProjects: Project[] = [];
                for (let project of res) {
                    ownedProjects.push(new Project(
                        userId,
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
                        )
                    );
                }
                this.ownedProjects = ownedProjects;
                return ownedProjects;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getAssignedTasksOfUser(userId): Observable<{}> {
        return this.http.get('http://localhost:3000/api/user/tasks/' + userId)
            .map((response: Response) => {
                const res = response.json();
                let assignedTasks: ProjectTask[] = [];
                for (let projectTask of res) {
                    assignedTasks.push(new ProjectTask(
                        projectTask.title,
                        projectTask.description,
                        projectTask.requiredSkills,
                        projectTask.assignedUsers,
                        null
                        )
                    );
                }
                this.assignedTasks = assignedTasks;
                return assignedTasks;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updateUserPassword(id: string, oldPassword: string, newPassword: string): Observable<{}> {
        const body = {
            id,
            oldPassword,
            newPassword
        };
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put('http://localhost:3000/api/user/password', body, { headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updateUser(user: User): Observable<{}> {
        const newUserSkills = [];
        user.userSkills.forEach(oldUserSkill => {
            let userSkill = {
                rating: oldUserSkill.rating,
                skill: oldUserSkill.skill._id
            };
            newUserSkills.push(userSkill);
        });

        user.userSkills = newUserSkills;

        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put('http://localhost:3000/api/user', body, { headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getUserImage(userId, size?: string): Observable<{}> {
        let routeParams = size ? userId + "/" + size : userId;
        return this.http.get('http://localhost:3000/api/user/img/' + routeParams, {responseType: ResponseContentType.Blob })
        .map((response: Response) => (response.status === 200) ? this.createImageUrl(response.blob()) : null)
        .catch((error: Response) => Observable.throw(error.json()));
    }

    uploadUserImage(userId, image: File): Observable<{}> {
        var formData  =  new FormData();
        formData.append('image', image);
        return this.http.post('http://localhost:3000/api/user/img/' + userId, formData, {responseType: ResponseContentType.Blob})
            .map((response: Response) => this.createImageUrl(response.blob()))
            .catch((error: Response) => Observable.throw(error))
    }

    deleteUser(user: User) {
        this.users.splice(this.users.indexOf(user), 1);
        const body = JSON.stringify(user);
        return this.http.delete('http://localhost:3000/api/user/' + user._id)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    createImageUrl(blob: Blob) {
        let urlCreator = window.URL;
        return urlCreator.createObjectURL(blob);
    }
}
