import { Component, OnInit, Renderer, trigger, state, style, transition, animate } from '@angular/core';
import { User } from "../../_models/user.model";
import { Project } from "../../_models/project.model";
import { UserService } from "../../_services/user.service";
import { SkillService } from "../../_services/skill.service";
import { SkillSearchService } from "../../_services/skill-search.service";
import { AuthService } from "../../_services/auth.service";

@Component ({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.template.html',
    styleUrls: ['user-profile.style.scss'],
    providers: [UserService, SkillService, SkillSearchService],
    animations: [
        trigger('expand', [
            state('active', style({
                maxHeight: '300px'
            })),
            state('inactive', style({
                maxHeight: '0',
                display: 'none'
            })),
            transition('inactive <=> active', animate('400ms linear'))
        ])
    ]
})

export class UserProfileComponent implements OnInit {
    user: User;
    projects: Project[];
    tasks: any[] = [
        {title: 'Paper Prototyping', description: 'lasdflk lskefldf lskeflksff lwkeflksdf', client: 'Bosch'},
        {title: 'Paper Prototyping', description: 'lasdflk lskefldf lskeflksff lwkeflksdf', client: 'Bosch'},
        {title: 'Create Information Architecture', description: 'lsakjf lksdfl klskdf sldkf', client: 'Siemens'},
        {title: 'Paper Prototyping', description: 'lasdflk lskefldf lskeflksff lwkeflksdf', client: 'Bosch'},
        {title: 'Paper Prototyping', description: 'lasdflk lskefldf lskeflksff lwkeflksdf', client: 'Bosch'},
        ];
    showTask = true;
    showSkill = false;
    showProject = false;

    constructor(private userService: UserService,
                private authService: AuthService,
                private renderer: Renderer) {}

    ngOnInit() {
        const currentUser = this.authService.currentUser();

        if (currentUser) {
            this.userService.getUserById(currentUser._id)
                .subscribe(
                    (user: User) => this.user = user,
                    error => console.log(error)
            );

            this.userService.getUserImage(currentUser._id)
                .subscribe(
                    data => {
                        let profilePicture = document.getElementById('profile-picture');
                        this.renderer.setElementProperty(profilePicture, 'src', data);
                    },
                    error => console.log(error)
                );

            this.userService.getProjectsCreatedByUser(currentUser._id)
                .subscribe(
                        (projects: Project[]) =>  this.projects = projects,
                        error => console.log(error)
                    )
        }
    }

    toggleSkill() {
        this.showSkill = !this.showSkill;
    }
    toggleProject() {
        this.showProject = !this.showProject;
    }
    toggleTask() {
        this.showTask = !this.showTask;
    }
}
