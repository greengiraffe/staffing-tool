import { Component, OnInit, Renderer, trigger, state, style, transition, animate } from '@angular/core';
import { User } from "../../_models/user.model";
import { Project } from "../../_models/project.model";
import { ProjectTask } from "../../_models/project-task.model";
import { UserService } from "../../_services/user.service";
import { SkillService } from "../../_services/skill.service";
import { SkillSearchService } from "../../_services/skill-search.service";
import { AuthService } from "../../_services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { ModalService } from "../../_services/modal.service";
import { ChangePasswordComponent } from "./change-password.component";

@Component ({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.template.html',
    styleUrls: ['user-profile.style.scss'],
    providers: [UserService, SkillService, SkillSearchService],
})

export class UserProfileComponent implements OnInit {
    user: User;
    projects: Project[];
    assignedTasks: any[]; // backend returns [{ task: {}, project: { _id: string, client: string, title: string }}]
    showTask = true;
    showSkill = true;
    showProject = true;

    editingPhone = false;
    newPhone: string;

    editingSkills = false;
    pictureElement;
    imgToUpload: File;
    changePwdModal = "change-pwd-modal";

    constructor(private userService: UserService,
                private authService: AuthService,
                private skillSearchService: SkillSearchService,
                private renderer: Renderer,
                private modalService: ModalService,
                private _flash: FlashMessagesService) {}

    ngOnInit() {
        //clear all modals to prevent memory leak
        this.modalService.clearAllModals();

        const currentUser = this.authService.currentUser();
        this.pictureElement = document.getElementById('profile-picture');

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
                        (projects: Project[]) => {
                            this.projects = projects;
                            this.showProject = this.projects.length > 0
                        },
                        error => console.log(error)
                    );
            this.userService.getAssignedTasksOfUser(currentUser._id)
                .subscribe(
                    (res: any[]) => {
                        this.assignedTasks = res;
                        this.showTask = this.assignedTasks.length > 0
                    },
                    error => console.log(error)
                    );

            this.userService.getUserImage(currentUser._id)
                .subscribe(
                    data =>  this.renderer.setElementProperty(this.pictureElement, 'src', data),
                    error => console.log(error)
                );
        }
    }

    saveNewPhone() {
        let lastPhone = this.user.phone;
        this.user.phone = this.newPhone;

        this.userService.updateUser(this.user).subscribe(
            data => this._flash.show('Successfully saved!', { cssClass: 'alert-success', timeout: 2000 }),
            error => {
                this.user.phone = lastPhone;
                this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 2000 })
            }
        );

        this.editingPhone = false;
    }

    saveSkills() {
        let lastSkills = this.user.userSkills;
        this.user.userSkills = this.skillSearchService.userSkills;

        this.userService.updateUser(this.user).subscribe(
            data => this._flash.show('Successfully saved!', { cssClass: 'alert-success', timeout: 2000 }),
            error => {
                this.user.userSkills = lastSkills;
                this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 2000 })
            }
        );

        this.editingSkills = false;
        this.skillSearchService.resetSearch();
    }
    cancelSkills() {
        this.editingSkills = false;
        this.skillSearchService.resetSearch();
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
    /**
     * Uploads the chosen image as profile picture
     */
    upload() {
        this.userService.uploadUserImage(this.user._id, this.imgToUpload)
            .subscribe(
                data => { this.renderer.setElementProperty(this.pictureElement, 'src', data); this.loadNewAvatarImageIntoCache() } ,
                error => console.log(error)
            );
    }

    loadNewAvatarImageIntoCache() {
        this.userService.getUserImage(this.user._id, 'small')
            .subscribe(
                data => sessionStorage.setItem(this.user._id, ""+data),
                error => console.log(error)
            );
    }

    /**
     * Update the chosen image
     */
    fileChanged(inputFile: any){
        this.imgToUpload = inputFile.target.files[0];
        this.upload();
    }

    changePassword(changePwdComponent: ChangePasswordComponent) {
        let formValue = changePwdComponent.changeForm.value;

        this.userService.updateUserPassword(
            this.authService.currentUser()._id,
            formValue['oldPw'],
            formValue['newPw']['confirm'])
            .subscribe(
                data => {
                    changePwdComponent.changeForm.reset();
                    this.modalService.close(this.changePwdModal);
                    this._flash.show("Password changed!", { cssClass: 'alert-success', timeout: 2000 })
                },
                error => {
                    console.log(error);
                    changePwdComponent.changeForm.reset();
                    changePwdComponent.changeForm.setErrors({
                        'wrongPassword': true
                    });
                }
            );
    }
}
