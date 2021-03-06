import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from "../../_models/user.model";
import { Skill } from "../../_models/skill.model";
import { UserService } from "../../_services/user.service";
import { SkillService } from "../../_services/skill.service";
import { UserSkill } from "../../_models/user-skill.model";
import { SkillSearchService } from "../../_services/skill-search.service";
import { AuthService } from "../../_services/auth.service";

@Component({
    selector: 'app-user-skill-list',
    templateUrl: 'user-skill-list.template.html',
    styleUrls: ['user-skill-list.style.scss']
})

export class UserSkillListComponent implements OnInit, OnChanges, OnDestroy {

    @Input() showRemove = false;
    @Input() showSkillTypeIcons = true;
    @Input() user: User;

    professionalSkills: Array<Skill> = [];
    basicSkills:        Array<Skill> = [];
    interestSkills:     Array<Skill> = [];
    skillSearchServiceSubscription;

    constructor(private userService: UserService,
                private authService: AuthService,
                private skillService: SkillService,
                private skillSearchService: SkillSearchService) {}

    ngOnInit() {

        // Add a new skill when it's selected in the skill-search
        this.skillSearchServiceSubscription = this.skillSearchService.userSkillAdded$
            .subscribe(userSkill => this.addSkill(userSkill));

        if(this.user) {
            this.fillArrays();
        }
    }

    ngOnChanges(changes: any) {
        if(this.user) {
            this.fillArrays();
        }
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
        const skill = userSkill.skill;
        if (typeof skill === 'string' || skill == null) return;

        if( this.interestSkills.findIndex(elem => elem._id === skill._id) === -1&&
            this.basicSkills.findIndex(elem => elem._id === skill._id) === -1 &&
            this.professionalSkills.findIndex(elem => elem._id === skill._id) === -1)
        {
            switch (userSkill.rating) {
                case 0:
                    this.interestSkills.push(skill);
                    break;
                case 1:
                    this.basicSkills.push(skill);
                    break;
                case 2:
                    this.professionalSkills.push(skill);
                    break;
            }
            this.skillSearchService.skillAdded(skill);
        }
    }

    /**
     * Remove a skill from a skill set and inform the service.
     */
    removeSkill(skill: Skill, skillList: Array<Skill>) {
        if (skillList.findIndex(elem => elem._id === skill._id) > -1) {
            skillList.splice(skillList.indexOf(skill), 1);
            this.skillSearchService.removeSkill(skill);
        }
    }

    ngOnDestroy() {
        // Prevent memory leaks
        this.skillSearchServiceSubscription.unsubscribe();
    }
}
