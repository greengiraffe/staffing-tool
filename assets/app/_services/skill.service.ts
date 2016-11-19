import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Skill } from "../_models/skill.model";

@Injectable()
export class SkillService {
    private skillCollection: Skill[] = [];

    constructor(private http: Http) {}


    addSkill(skill: Skill) {
        this.skillCollection.push(skill);

        const body = JSON.stringify(skill);
        const headers = new Headers({'Content-Type': 'application/json'});
        // const token = localStorage.getItem('token')
        //     ? '?token=' + localStorage.getItem('token')
        //     : '';
        return this.http.post('http://localhost:3000/skill', body, {headers: headers})
            .map((response: Response) => response.json())
            //     const result = response.json();
            //     const skill = new Skill(
            //         result.obj._id,
            //         result.obj.name);
            //     this.skillCollection.push(skill);
            //     return skill;
            // })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteSkill(skill: Skill) {
        this.skillCollection.splice(this.skillCollection.indexOf(skill), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:3000/skill/' + skill.skillId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getSkills(): Observable<{}> {
        return this.http.get('http://localhost:3000/skill')
            .map((response: Response) => {
                const skills = response.json();
                let transformedSkills: Skill[] = [];
                for (let skill of skills) {
                    transformedSkills.push(new Skill(
                        skill._id,
                        skill.name)
                    );
                }
                this.skillCollection = transformedSkills;
                return transformedSkills;
            })
    }

}
