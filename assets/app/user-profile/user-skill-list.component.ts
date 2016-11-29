import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { SkillService } from '../_services/skill.service';
import { User } from '../_models/user.model';
import { UserSkill } from '../_models/user-skill.model';
import { Skill } from '../_models/skill.model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-user-skill-list',
    template: `
      <div class="skills-container">
        <div class="professional-skills">
          <h2>Professional Skills</h2>
          <div class="skill" *ngFor="let skill of professionalSkills">
            <div class="skill-name">{{ skill.name }}</div>
          </div>
        </div>
        <div class="basic-skills">
          <h2>Basic Skills</h2>
          <div class="skill" *ngFor="let skill of basicSkills">
            <div class="skill-name">{{ skill.name }}</div>
          </div>
        </div>
        <div class="interests">
          <h2>Interests</h2>
          <div class="skill" *ngFor="let interest of interests">
            <div class="skill-name">{{ interest.name }}</div>
          </div>
        </div>
      </div>
    `,
    styleUrls: ['user-profile.style.scss'],
    providers: [UserService, SkillService]
})

export class UserSkillListComponent {

    user: User;
    skillList: Skill[];
    professionalSkills:Skill[] = [];
    basicSkills:Skill[] = [];
    interests:Skill[] = [];

    constructor(private userService: UserService, private skillService: SkillService) {}

    ngOnInit() {
        Observable.forkJoin(
            this.userService.getUserById('583ddf5f22bb3a5fdf380fd5'),
            this.skillService.getSkills()
        ).subscribe(res => {
            this.user = res[0] as User;
            this.skillList = res[1] as Skill[];
            this.fillArrays();
        });
    }

    fillArrays() {
        let userSkills = this.user.userSkills;

        for (let userSkill of userSkills) {
            switch (userSkill.rating) {
                case 0:
                    this.interests.push(this.getAssociatedSkill(userSkill));
                    break;
                case 1:
                    this.basicSkills.push(this.getAssociatedSkill(userSkill));
                    break;
                case 2:
                    this.professionalSkills.push(this.getAssociatedSkill(userSkill));
                    break;
            }
        }
    };

    getAssociatedSkill(userSkill: UserSkill) {
        return this.skillList.find((skill) => {
            return skill.skillId === userSkill.skill
        });
    }

}
