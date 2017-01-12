import { Component, OnInit, Renderer } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../../_services/project.service';
import { SkillService } from '../../_services/skill.service';
import { UserService } from '../../_services/user.service';

import { Project } from "../../_models/project.model";
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
            this.route.params
                .switchMap((params: Params) =>
                    this.projectService.getProjectById(params['id']))
                .subscribe((project: Project) => {
                    this.project = project;
                    this.currentUserCanEdit = this.checkIfUserCanEdit(currentUser);
                    this.loadUserAvatars();
                });
        }
    }

    loadUserAvatars() {
        this.project.projectTasks.forEach(task => {
            task.assignedUsers.forEach(user => {
                if(this.idsOfLoadedPictures.indexOf(user._id) < 0) {
                    this.userService.getUserImage(user._id, "small")
                        .subscribe(data => {
                            this.renderImages(data, user._id);
                        },
                        error => {
                            this.renderImages('/img/usersmall.png', user._id);
                        });
                    this.idsOfLoadedPictures.push(user._id)
                }
            });
        });
    }

    renderImages(url: any, userId: string) {
        var images = document.getElementsByClassName(userId);
        for (var i = 0; i < images.length; ++i) {
            this.renderer.setElementProperty(images[i], 'src', url)
        }
    }

    private checkIfUserCanEdit(user: User) {
        function isAssignedUser(user) {
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
            this.project.creator._id === user._id ||
            isAssignedUser(user);
    }
}
