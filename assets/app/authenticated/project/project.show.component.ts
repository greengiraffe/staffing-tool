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
import { RightsService } from "../../_services/rights.service";
import { ModalService } from "../../_services/modal.service";

@Component({
    selector: 'app-project-show',
    templateUrl: 'project.show.template.html',
    styleUrls: ['project.show.style.scss'],
    providers: [ ProjectService, SkillService, UserService ]
})

export class ProjectShowComponent implements OnInit {
    private currentUserCanEditProject = false;
    private currentUserCanEditTask = false;
    private currentUserCanDeleteTask = false;
    private deleteTaskModalIds: string[] = [];
    private editTaskModalIds: string[] = [];

    project: Project;
    currentUserIsCreator = false;
    urlsOfLoadedPictures: Object = new Object();
    idsOfLoadedPictures = new Array<string>();

    constructor(
        private projectService: ProjectService,
        private skillService: SkillService,
        private userService: UserService,
        private authService: AuthService,
        private rightsService: RightsService,
        private modalService: ModalService,
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

                    // set rights
                    this.currentUserIsCreator = project.creator._id === currentUser._id;
                    this.currentUserCanEditProject = this.rightsService.canEditProject(project, currentUser);
                    this.currentUserCanEditTask = this.rightsService.canEditTask(project, currentUser);
                    this.currentUserCanDeleteTask = this.rightsService.canDeleteTask(project, currentUser);

                    this.project.projectTasks.forEach(
                        (task, i) => {
                            this.loadUserAvatars(task.assignedUsers);
                            this.loadUserAvatars(task.interestedUsers);
                            this.editTaskModalIds.push("editTaskModal" + i);
                            this.deleteTaskModalIds.push("deleteTaskModal" + i);
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

    unassignUser(task: ProjectTask, user: User) {
        let userIndex = task.assignedUsers.indexOf(user);
        task.assignedUsers.splice(userIndex, 1);
        this.projectService.updateProject(this.project)
            .subscribe();
    }

    deleteTask(taskComponent, i) {
        let task = taskComponent.task;

        this.modalService.close(this.deleteTaskModalIds[i]);
        this.projectService.deleteProjectTask(this.project._id, task._id)
            .subscribe(data => {
                this.editTaskModalIds.splice(i, 1);
                this.deleteTaskModalIds.splice(i, 1);
                this.project.projectTasks.splice(this.project.projectTasks.indexOf(task), 1);
            });
    }

    updateTask(taskComponent, i) {
        const editedTask = new ProjectTask(
            taskComponent.taskForm.controls["title"]["_value"],
            taskComponent.taskForm.controls["description"]["value"],
            taskComponent.task.requiredSkills,
            taskComponent.taskForm.controls["status"]["value"],
            taskComponent.task.assignedUsers,
            taskComponent.task.interestedUsers,
            taskComponent.task._id
        );

        this.modalService.close(this.editTaskModalIds[i]);

        this.project.projectTasks[i] = editedTask;
        this.projectService.updateProjectTask(this.project._id, editedTask)
            .subscribe();
    }

    closeModal(modalId, event) {
        event.stopPropagation();
        this.modalService.close(modalId);
    }
}
