import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';

@Component ({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.template.html',
    providers: [UserService],
    styleUrls: ['user-profile.style.scss']
})

export class UserProfileComponent implements OnInit {

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
