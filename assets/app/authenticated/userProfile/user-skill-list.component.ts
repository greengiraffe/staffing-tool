import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from "../../_models/user.model";
import { Skill } from "../../_models/skill.model";
import { UserService } from "../../_services/user.service";
import { SkillService } from "../../_services/skill.service";
import { UserSkill } from "../../_models/user-skill.model";
import { SkillSearchService } from "../../_services/skill-search.service";


@Component({
    selector: 'app-user-skill-list',
    templateUrl: 'user-skill-list.template.html',
    styleUrls: ['skill-search.style.scss']
})

export class UserSkillListComponent implements OnInit {

    @Input() showRemove = false;

    user: User;
    skillList: Skill[];
    professionalSkills:Set<Skill> = new Set<Skill>();
    basicSkills:Set<Skill> = new Set<Skill>();
    interestSkills:Set<Skill> = new Set<Skill>();
    userProfileEditSubscription;

    constructor(private userService: UserService,
                private skillService: SkillService,
                private skillSearchService: SkillSearchService) {}

    ngOnInit() {
        // Fork join two streams to get the user and the skills simultaneously
        Observable.forkJoin(
            this.userService.getUserById(localStorage.getItem("userId")),
            this.skillService.getSkills()
        ).subscribe(res => {
            this.user = res[0] as User;
            this.skillList = res[1] as Skill[];
            this.fillArrays();
        });

        // Add a new skill when it's selected in the skill-search
        this.skillSearchService.userSkillAdded$.subscribe(
            userSkill => {
                this.addSkill(userSkill);
            });

        // Fill userSkill array in skillSearchService with current skills
    }

    /**
     * Fills the three Skill sets with Skills.
     */
    fillArrays() {
        for (let userSkill of this.user.userSkills) {
            this.addSkill(userSkill);
            this.skillSearchService.userSkills.push(userSkill)
        }
    };

    /**
     * Puts the UserSkill into one of the three Skill sets
     * according to its rating. The UserSkill is converted to
     * a Skill object to be able to access the name field.
     */
    addSkill(userSkill: UserSkill) {
        const associatedSkill = this.getAssociatedSkill(userSkill);

        switch (userSkill.rating) {
            case 0:
                this.interestSkills.add(associatedSkill);
                break;
            case 1:
                this.basicSkills.add(associatedSkill);
                break;
            case 2:
                this.professionalSkills.add(associatedSkill);
                break;
        }
        this.skillSearchService.skillAdded(associatedSkill)
    }

    /**
     * Returns the Skill corresponding to the UserSkill.
     */
    getAssociatedSkill(userSkill: UserSkill) {
        return this.skillList.find((skill) => {
            return skill.skillId === userSkill.skill;
        });
    }

    /**
     * Remove a skill from a skill set and inform the service.
     */
    removeSkill(skill: Skill, skillList: Set<Skill>) {
        skillList.delete(skill);
        this.skillSearchService.removeSkill(skill);
    }
}
