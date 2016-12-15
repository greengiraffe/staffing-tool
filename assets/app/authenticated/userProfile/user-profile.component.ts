import { Component, OnInit, Renderer } from '@angular/core';
import { User } from "../../_models/user.model";
import { Project } from "../../_models/project.model";
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
    projects: Project[];

    constructor(private userService: UserService, private renderer: Renderer) {}

    ngOnInit() {
        let currentUserId = localStorage.getItem("userId")
        this.userService.getUserById(currentUserId)
            .subscribe(
                (user: User) => this.user = user,
                error => console.log(error)
        );
        this.userService.getUserImage(currentUserId)
            .subscribe(
                data => {
                    let profilePicture = document.getElementsByClassName('profile-picture')[0];
                    this.renderer.setElementProperty(profilePicture, 'src', data);
                },
                error => console.log(error)
            );
        this.userService.getProjectsCreatedByUser(currentUserId)
            .subscribe(
                    (projects: Project[]) =>  this.projects = projects,
                    error => console.log(error)
                )
    }
}
