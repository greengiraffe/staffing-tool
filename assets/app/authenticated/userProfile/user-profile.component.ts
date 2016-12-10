import { Component, OnInit, Renderer } from '@angular/core';
import { User } from "../../_models/user.model";
import { UserService } from "../../_services/user.service";
import { SkillService } from "../../_services/skill.service";
import { SkillSearchService } from "../../_services/skill-search.service";

@Component ({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.template.html',
    styleUrls: ['user-profile.style.scss'],
    providers: [UserService, SkillService, SkillSearchService]
})

export class UserProfileComponent implements OnInit {
    user: User;

    constructor(private userService: UserService, private renderer: Renderer) {}

    ngOnInit() {
        this.userService.getUserById(localStorage.getItem("userId"))
            .subscribe(
                (user: User) => this.user = user,
                error => console.log(error)
        );
        this.userService.getUserImage(localStorage.getItem("userId"))
            .subscribe(
                data => {
                    let profilePicture = document.getElementsByClassName('profile-picture')[0];
                    this.renderer.setElementProperty(profilePicture, 'src', data);
                },
                error => console.log(error)
            );
    }
}
