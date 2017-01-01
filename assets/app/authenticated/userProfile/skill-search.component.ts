import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Skill } from "../../_models/skill.model";
import { SkillService } from "../../_services/skill.service";
import { SkillSearchService } from "../../_services/skill-search.service";
import { UserSkill } from "../../_models/user-skill.model";

@Component({
  selector: 'app-skill-search',
  template: `
    <input
      [(ngModel)]="searchText"
      class="skill-search form-control"
      placeholder="Search for a Skill"
      type="text">
    <ul class="skill-list" [ngSwitch]="clickableSkill">
      <li class="skill" *ngFor="let skill of skills | filter : 'name' : searchText" (click)="selectSkill(skill)">
        {{ skill.name }}
        <span *ngIf="showSkillButtons" class="skill-buttons">
            <span class="skill-icon skill-btn professional"
				(click)="selectUserSkill(skill, 2)"
				title="Add skill to professional skills"></span>
            <span class="skill-icon skill-btn basic"
				(click)="selectUserSkill(skill, 1)"
				title="Add skill to basic skills"></span>
            <span class="skill-icon skill-btn interest"
				(click)="selectUserSkill(skill, 0)"
				title="Add skill to interests"></span>
        </span>
      </li>
    </ul>
    <p *ngIf="skills.length === 0">There are no more available skills.</p>
  `,
  styleUrls: ['skill-search.style.scss']
})

export class SkillSearchComponent implements OnInit {
    @Input() showSkillButtons = false;

    skills: Skill[];
    hiddenSkills: Skill[];
    searchText;

    constructor(private skillService: SkillService, private skillSearchService: SkillSearchService) {
        this.skills = [];
        this.hiddenSkills = [];
    }

    ngOnInit() {
        this.skillService.getSkills()
            .subscribe(
                skills => {
                    this.skills = skills as Skill[];
                    this.sortSkills();
                },
                error => console.log(error)
            );

        this.skillSearchService.skillReceived$.subscribe(
            receivedSkill => this.hideSkill(receivedSkill));

        this.skillSearchService.skillRemoved$.subscribe(
            removedSkill => this.showSkill(removedSkill));
    }

    sortSkills() {
        this.skills.sort((a, b) => {
            if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            else return 0;
        })
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
        this.sortSkills();
    }

    /**
     * Stream the selected skill as a UserSkill
     */
    selectUserSkill(skill: Skill, rating: number) {
        this.searchText = null;
        const userSkill = new UserSkill(skill, rating);
        this.skillSearchService.addUserSkill(userSkill);
    }

    /**
     * Stream the selected skill as a Skill
     */
    selectSkill(skill: Skill) {
        this.searchText = null;
        this.skillSearchService.addSkill(skill);
    }

}
