import { Component, OnInit } from '@angular/core';
import { SkillSuggestionsComponent } from '../onboarding/skill/skill-suggestions.component';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: 'user-profile-edit.template.html',
  styleUrls: ['user-profile.style.scss']
})

export class UserProfileEditComponent {

  user: User;

  constructor(private userService: UserService) {}

  ngOnInit() {

    this.userService.getUserById('5834d3782930d72869c78616')
      .subscribe(
        (user: User) => this.user = user,
        error => console.log(error)
      );
  }
}
