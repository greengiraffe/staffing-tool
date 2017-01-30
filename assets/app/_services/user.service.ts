import { Injectable } from "@angular/core";
import { AuthHttp } from 'angular2-jwt';
import { Headers, Response, ResponseContentType } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "../_models/user.model";
import { Project } from "../_models/project.model";
import { ProjectTask } from "../_models/project-task.model";
import { UserSkill } from "../_models/user-skill.model";
import { isNullOrUndefined } from "util";



@Injectable()
export class UserService {
    private users: User[] = [];
    private ownedProjects: Project[] = [];
    private assignedTasks: ProjectTask[] = [];

    constructor(private authHttp: AuthHttp) {}

    createUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.authHttp.post('http://localhost:3000/api/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getUsers(): Observable<{}> {
        return this.authHttp.get('http://localhost:3000/api/user/list')
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
      return this.authHttp.get('http://localhost:3000/api/user/' + userId)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    getProjectsCreatedByUser(userId): Observable<{}> {
        return this.authHttp.get('http://localhost:3000/api/user/projects/' + userId)
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
        return this.authHttp.get('http://localhost:3000/api/user/tasks/' + userId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getUserSkills(userId): Observable<UserSkill[]> {
        return this.authHttp.get('http://localhost:3000/api/user/skills/' + userId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updateUserPassword(id: string, oldPassword: string, newPassword: string): Observable<{}> {
        const body = {
            id,
            oldPassword,
            newPassword
        };
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.authHttp.put('http://localhost:3000/api/user/password', body, { headers })
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
        return this.authHttp.put('http://localhost:3000/api/user', body, { headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getUserImage(userId, size?: string): Observable<{}> {
        let routeParams = size ? userId + "/" + size : userId;
        return this.authHttp.get('http://localhost:3000/api/user/img/' + routeParams, {responseType: ResponseContentType.Blob })
        .map((response: Response) => this.imgToBase64(response.blob(), size ? userId : "profile_img"))
        .catch((error: Response) => Observable.throw(error.json()));
    }

    uploadUserImage(userId, image: File): Observable<{}> {
        let formData  =  new FormData();
        formData.append('image', image);
        return this.authHttp.post('http://localhost:3000/api/user/img/' + userId, formData, {responseType: ResponseContentType.Blob})
            .map((response: Response) => {
                this.getUserImage(userId, "small").subscribe();
                return this.imgToBase64(response.blob(), "profile_img");
            })
            .catch((error: Response) => Observable.throw(error))
    }

    imgToBase64(data: Blob, key: string) {
        if (!data) return;
        return new Promise(function (resolve, reject) {
            let image;
            let myReader:FileReader = new FileReader();
            myReader.readAsDataURL(data);
            myReader.onloadend = (e) => {
                image = myReader.result;
                if(!image) reject("/img/usersmall.png");
                localStorage.setItem(key , image);
                resolve(image);
            };
        })
    };

    deleteUser(user: User) {
        this.users.splice(this.users.indexOf(user), 1);
        const body = JSON.stringify(user);
        return this.authHttp.delete('http://localhost:3000/api/user/' + user._id)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
