import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Skill } from "../_models/skill.model";
import {UserSkill} from "../_models/user-skill.model";

@Injectable()
export class UserProfileEditService {

    // Keep track of the user's skills
    userSkills: UserSkill[] = [];

    // Observable sources
    private userSkillAddedSource = new Subject<UserSkill>();
    private skillReceivedSource = new Subject<Skill>();
    private skillRemovedSource = new Subject<Skill>();

    // Observable streams
    userSkillAdded$ = this.userSkillAddedSource.asObservable();
    skillRemoved$ = this.skillRemovedSource.asObservable();
    skillReceived$ = this.skillReceivedSource.asObservable();

    addUserSkill(userSkill: UserSkill) {
        this.userSkillAddedSource.next(userSkill);
        this.userSkills.push(userSkill);
    }

    skillAdded(skill: Skill) {
        this.skillReceivedSource.next(skill);
    }

    removeSkill(skill: Skill) {
        this.skillRemovedSource.next(skill);
        this.userSkills = this.userSkills.filter(
            userSkill => {
                return userSkill.skill !== skill.skillId
            })
    }
}
