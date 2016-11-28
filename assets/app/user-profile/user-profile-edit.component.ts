import { Component, OnInit } from '@angular/core';
import { SkillSuggestionsComponent } from '../onboarding/skill/skill-suggestions.component';
import { UserService } from '../_services/user.service';
import { UserProfileEditService } from '../_services/user-profile-edit.service';
import { User } from '../_models/user.model';
import { Skill } from '../_models/skill.model';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: 'user-profile-edit.template.html',
  styleUrls: ['user-profile.style.scss'],
  providers: [UserProfileEditService]
})

export class UserProfileEditComponent {

  user: User;
  professionalSkills = [];
  basicSkills = [];
  interests = [];

  constructor(private userService: UserService, private userProfileEditService: UserProfileEditService) {}

  ngOnInit() {

    this.userService.getUserById('5834d3782930d72869c78616')
      .subscribe(
        (user: User) => this.user = user,
        error => console.log(error)
      );
  }

  addItem(id: number) {
    var item = this.userProfileEditService.getSelectedItem();
    this.userProfileEditService.clearSelectedItem();
    if(item) {
      if(id === 1) {
        this.professionalSkills.push(item);
      } else if(id === 2) {
        this.basicSkills.push(item);
      } else if(id === 3) {
        this.interests.push(item);
      }
    } else {
      alert("Cannot add nothing.");
    }
  }

  deleteItem(item: Skill, id: number) {
    if(id === 1) {
      var index = this.professionalSkills.indexOf(item);
      if(index != -1) {
  	     this.professionalSkills.splice(index, 1);
      }
    } else if(id === 2) {
      var index = this.basicSkills.indexOf(item);
      if(index != -1) {
  	     this.basicSkills.splice(index, 1);
      }
    } else if(id === 3) {
      var index = this.interests.indexOf(item);
      if(index != -1) {
  	     this.interests.splice(index, 1);
      }
    }
  }

}
