import { Component, OnInit, Renderer } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../../_services/project.service';
import { SkillService } from '../../_services/skill.service';
import { UserService } from '../../_services/user.service';

import { Project } from "../../_models/project.model";
import { ProjectTask } from "../../_models/project-task.model";
import { Skill } from "../../_models/skill.model";

import 'rxjs/add/operator/switchMap';
import { AuthService } from "../../_services/auth.service";
import { User } from "../../_models/user.model";

@Component({
    selector: 'app-project-show',
    templateUrl: 'project.show.template.html',
    styleUrls: ['project.show.style.scss'],
    providers: [ ProjectService, SkillService, UserService ]
})

export class ProjectShowComponent implements OnInit {
    private currentUserCanEdit = false;

    project: Project;
    currentUserIsCreator = false;
    urlsOfLoadedPictures: Object = new Object();
    idsOfLoadedPictures = new Array<string>();

    constructor(
        private projectService: ProjectService,
        private skillService: SkillService,
        private userService: UserService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private renderer: Renderer
    ) {}

    ngOnInit() {
        const currentUser = this.authService.currentUser();

        if (currentUser) {
            console.log(this.route);
            this.route.params
                .switchMap((params: Params) =>
                    this.projectService.getProjectById(params['id']))
                .subscribe((project: Project) => {
                    this.project = project;
                    this.currentUserIsCreator = project.creator._id === currentUser._id;
                    this.currentUserCanEdit = this.checkIfUserCanEdit(currentUser);
                    this.project.projectTasks.forEach(
                        task => {
                            this.loadUserAvatars(task.assignedUsers)
                            this.loadUserAvatars(task.interestedUsers)
                        })
                });
        }
    }

    loadUserAvatars(users: Array<User>) {
        this.project.projectTasks.forEach(task => {
            users.forEach(user => {
                if(!this.urlsOfLoadedPictures[user._id]) {
                    this.userService.getUserImage(user._id, "small")
                        .subscribe(data => {
                            this.urlsOfLoadedPictures[user._id] = data;
                            this.renderImages(user._id)
                        },
                        error => {
                            this.urlsOfLoadedPictures[user._id] = '/img/usersmall.png';
                            this.renderImages(user._id)
                        });
                }
            });
        });
    }

    renderImages(userId: string) {
        var images = document.getElementsByClassName(userId);
        for (var i = 0; i < images.length; ++i) {
            this.renderer.setElementProperty(images[i], 'src', this.urlsOfLoadedPictures[userId])
        }
    }

    assignUser(task: ProjectTask, user: User) {
        task.assignedUsers.push(user);
        let userIndex = task.interestedUsers.indexOf(user);
        task.interestedUsers.splice(userIndex, 1);
        this.projectService.updateProject(this.project)
            .subscribe(data => this.renderImages(user._id));
    }

    private checkIfUserCanEdit(user: User) {

        let isAssignedUser = user => {
            for(let task of this.project.projectTasks) {
                for(let assignedUser of task.assignedUsers) {
                    if(assignedUser._id === user._id) {
                        return true;
                    }
                }
            }
        }

        return user.role === 'admin' ||
            user.role === 'user_creator' ||
            this.currentUserIsCreator ||
            isAssignedUser(user);
    }
}
