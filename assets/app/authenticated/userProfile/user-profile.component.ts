import { Component, OnInit, Renderer, trigger, state, style, transition, animate } from '@angular/core';
import { User } from "../../_models/user.model";
import { Project } from "../../_models/project.model";
import { ProjectTask } from "../../_models/project-task.model";
import { UserService } from "../../_services/user.service";
import { SkillService } from "../../_services/skill.service";
import { SkillSearchService } from "../../_services/skill-search.service";
import { AuthService } from "../../_services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

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
            transition('inactive <=> active', animate('400ms ease-in-out'))
        ])
    ]
})

export class UserProfileComponent implements OnInit {
    user: User;
    projects: Project[];
    tasks: ProjectTask[] = [];
    showTask = true;
    showSkill = false;
    showProject = false;
    editMail = false;
    editLoc = false;
    editPhone = false;
    newMail: string;
    newLoc: string;
    newPhone: string;

    constructor(private userService: UserService,
                private authService: AuthService,
                private renderer: Renderer,
                private _flash: FlashMessagesService) {}

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
                    );
            this.userService.getAssignedTasksOfUser(currentUser._id)
                .subscribe(
                    (tasks: ProjectTask[]) => this.tasks = tasks,
                    error => console.log(error)
                    )
        }

        if (this.tasks.length == 0) this.showTask = false;
    }

    save(event) {
        let target = event.target || event.srcElement || event.currentTarget;
        let id = target.previousElementSibling.id;
        if (id == 'input-mail') {
            this.user.email = this.newMail;
        }
        else if (id == 'input-loc') {
            this.user.location = this.newLoc;
        }
        else if (id == 'input-phone') {
            this.user.phone = this.newPhone;
        }

        this.userService.updateUser(this.user).subscribe(
            data => this._flash.show('Successfully saved!', { cssClass: 'alert-success', timeout: 5000000 }),
            error => this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 })
        );
        this.editMail = false;
        this.editPhone = false;
        this.editLoc = false;
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
