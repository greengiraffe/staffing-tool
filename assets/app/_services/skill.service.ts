import { Http, Response, Headers } from "@angular/http";
import { AuthHttp } from 'angular2-jwt';
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Skill } from "../_models/skill.model";

@Injectable()
export class SkillService {
    private skillCollection: Skill[] = [];

    constructor(private authHttp: AuthHttp) {}

    addSkill(skill: string) {
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.authHttp.post('http://localhost:3000/api/skill', { skill }, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const skill = new Skill(
                    result.name,
                    result._id);
                this.skillCollection.push(skill);
                return result;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteSkill(skill: Skill) {
        this.skillCollection.splice(this.skillCollection.indexOf(skill), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.authHttp.delete('http://localhost:3000/api/skill/' + skill._id)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getSkills(): Observable<{}> {
        return this.authHttp.get('http://localhost:3000/api/skill/list')
            .map((response: Response) => {
                const res = response.json();
                let transformedSkills: Skill[] = [];
                for (let skill of res) {
                    transformedSkills.push(new Skill(
                        skill.name,
                        skill._id)
                    );
                }
                this.skillCollection = transformedSkills;
                return transformedSkills;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getSkillById(skillId: string): Observable<{}> {
        return this.authHttp.get('http://localhost:3000/api/skill/' + skillId)
            .map((response: Response) => {
                const res = response.json();
                return res;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

}
