import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Skill } from "../../_models/skill.model";
import { SkillService } from "../../_services/skill.service";
import { UserProfileEditService } from "../../_services/user-profile-edit.service";
import { UserSkill } from "../../_models/user-skill.model";

@Component({
  selector: 'app-skill-search',
  template: `
    <input
      [(ngModel)]="searchText"
      class="skill-search form-control"
      placeholder="Search for a Skill"
      type="text">
    <ul class="skill-list">
      <li class="skill" *ngFor="let skill of skills | filter : 'name' : searchText">
        {{ skill.name }}
        <span *ngIf="showSkillButtons" class="skill-buttons">
            <span class="skill-icon skill-btn professional"
                  title="Add skill to professional skills"
                  (click)="selectSkill(skill, 2)"></span>
            <span class="skill-icon skill-btn basic"
                  title="Add skill to basic skills"
                  (click)="selectSkill(skill, 1)"></span>
            <span class="skill-icon skill-btn interest"
                  title="Add skill to interests"
                  (click)="selectSkill(skill, 0)"></span>
        </span>
      </li>
    </ul>
  `,
  styleUrls: ['skill-search.style.scss']
})

export class SkillSearchComponent implements OnInit {
    @Input() showSkillButtons = false;

    skills: Skill[] = [];
    hiddenSkills: Skill[] = [];
    searchText;

    constructor(private skillService: SkillService, private userProfileEditService: UserProfileEditService) {}

    ngOnInit() {
        this.skillService.getSkills()
            .subscribe(
                skills => {
                    this.skills = skills as Skill[];
                },
                error => console.log(error)
            );

        this.userProfileEditService.skillReceived$.subscribe(
            receivedSkill => this.hideSkill(receivedSkill));

        this.userProfileEditService.skillRemoved$.subscribe(
            removedSkill => this.showSkill(removedSkill));
    }

    /**
     * Hide (i.e. remove) a skill from the list as it was added to the user-skill list
     */
    hideSkill(skill: Skill) {
        this.hiddenSkills.push(skill);
        this.skills = this.skills.filter(visibleSkill => visibleSkill.skillId !== skill.skillId);
    }

    /**
     * Show (i.e. add) a skill to the list as it was removed from the user-skill list
     */
    showSkill(skill: Skill) {
        this.skills.push(skill);
        this.hiddenSkills = this.hiddenSkills.filter(hiddenSkill => hiddenSkill.skillId !== skill.skillId);
    }

    /**
     * Stream the selected skill as a UserSkill
     */
    selectSkill(skill, rating) {
        const userSkill = new UserSkill(skill.skillId, rating);
        this.userProfileEditService.addUserSkill(userSkill);
    }
}
