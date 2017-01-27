import { Injectable } from '@angular/core';
import { Skill } from "../_models/skill.model";
import { UserSkill } from "../_models/user-skill.model";

@Injectable()
export class MatchService {

    public getMatch(requiredSkills: Skill[], userSkills: UserSkill[]): number {
        let match = 0;

        if(requiredSkills.length == 0) {
            return;
        }
        for(let userSkill of userSkills) {
            for(let reqSkill of requiredSkills) {
                if(userSkill.skill._id === reqSkill._id) {
                    switch(userSkill.rating){
                        case 0: match += 0.25;
                            break;
                        case 1: match += 0.7;
                            break;
                        case 2: match += 1;
                            break;
                        default: match += 0;
                    }
                }
            }
        }
        return (match / requiredSkills.length);
    }

}
