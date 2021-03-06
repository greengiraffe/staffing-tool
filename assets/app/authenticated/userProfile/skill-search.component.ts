import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Skill } from "../../_models/skill.model";
import { SkillService } from "../../_services/skill.service";
import { SkillSearchService } from "../../_services/skill-search.service";
import { UserSkill } from "../../_models/user-skill.model";
import { isNullOrUndefined } from "util";

@Component({
  selector: 'app-skill-search',
  template: `
    <input
      [(ngModel)]="searchText"
      class="skill-search form-control"
      placeholder="Search for a Skill"
      type="text">
    <ul class="g-tag-list skill-list" [ngSwitch]="clickableSkill">
      <li class="g-tag skill"
          [class.has-skill-buttons]="showSkillButtons"
          *ngFor="let skill of visibleSkills | filter : 'name' : searchText"
          (click)="selectSkill(skill)">
        {{ skill.name }}
        <span *ngIf="showSkillButtons" class="skill-buttons">
            <span class="fa fa-star professional"
                (click)="selectUserSkill(skill, 2)"
                title="Add skill to professional skills"></span>
            <span class="fa fa-star-half-o basic"
                (click)="selectUserSkill(skill, 1)"
                title="Add skill to basic skills"></span>
            <span class="fa fa-star-o interest"
                (click)="selectUserSkill(skill, 0)"
                title="Add skill to interests"></span>
        </span>
      </li>
    </ul>
    <p *ngIf="visibleSkills?.length === 0">There are no more available skills.</p>
  `,
  styleUrls: ['skill-search.style.scss']
})

export class SkillSearchComponent implements OnInit {
    @Input() showSkillButtons = false;

    skills: Skill[] = [];
    visibleSkills: Skill[] = [];
    hiddenSkills: Skill[] = [];
    searchText;

    constructor(private skillService: SkillService,
                private skillSearchService: SkillSearchService) { }

    ngOnInit() {
        this.skillService.getSkills()
            .subscribe(
                skills => {
                    this.skills = skills as Skill[];
                    this.visibleSkills = skills as Skill[];
                    this.sortSkills();
                },
                error => console.log(error)
            );

        this.skillSearchService.skillReceived$.subscribe(
            receivedSkill => this.hideSkill(receivedSkill));

        this.skillSearchService.skillRemoved$.subscribe(
            removedSkill => this.showSkill(removedSkill));

        this.skillSearchService.searchReset$.subscribe(() => {
            this.reset();
        });
    }

    sortSkills() {
        this.visibleSkills.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            else return 0;
        })
    }

    /**
     * Hide (i.e. remove) a skill from the list as it was added to the user-skill list
     */
    hideSkill(skill: Skill) {
        this.hiddenSkills.push(skill);
        this.visibleSkills = this.visibleSkills.filter(visibleSkill => visibleSkill._id !== skill._id);
    }

    /**
     * Show (i.e. add) a skill to the list as it was removed from the user-skill list
     */
    showSkill(skill: Skill) {
        if (this.visibleSkills.findIndex(s => s._id === skill._id) !== -1) {
            // prevent adding a duplicate
            return;
        }
        this.visibleSkills.push(skill);
        this.hiddenSkills = this.hiddenSkills.filter(hiddenSkill => hiddenSkill._id !== skill._id);
        this.sortSkills();
    }

    /**
     * Stream the selected skill as a UserSkill
     */
    selectUserSkill(skill: Skill, rating: number) {
        if(!isNullOrUndefined(skill._id) && !isNullOrUndefined(rating)) {
            this.searchText = null;
            const userSkill = new UserSkill(skill, rating);
            this.skillSearchService.addUserSkill(userSkill);
        }
    }

    /**
     * Stream the selected skill as a Skill
     */
    selectSkill(skill: Skill) {
        this.searchText = null;
        this.skillSearchService.addSkill(skill);
    }

    /**
     * Resets the search so it displays all visibleSkills again (i.e. no visibleSkills are hidden)
     */
    reset() {
        this.visibleSkills = new Array<Skill>();
        this.visibleSkills.push(...this.skills);
        this.sortSkills();
    }

}
