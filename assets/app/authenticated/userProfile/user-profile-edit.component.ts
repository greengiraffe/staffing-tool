import { Component, OnInit, Renderer } from '@angular/core';
import { User } from "../../_models/user.model";
import { UserService } from "../../_services/user.service";
import { SkillService } from "../../_services/skill.service";
import { UserProfileEditService } from "../../_services/user-profile-edit.service";


@Component({
  selector: 'app-user-profile-edit',
  templateUrl: 'user-profile-edit.template.html',
  styleUrls: ['user-profile.style.scss'],
  providers: [UserService, SkillService, UserProfileEditService]
})

export class UserProfileEditComponent {

    user;
    email;
    location;
    phone;
    currentProfilePicture;
    imgToUpload: File;

    constructor(private userService: UserService, private userProfileEditService: UserProfileEditService, private renderer: Renderer) {}

    ngOnInit() {
        this.userService.getUserById('58433892c39c721b14976675')
            .subscribe(
                (user: any)  => {
                    this.user = new User(
                                    user.email, 
                                    null, 
                                    user.role, 
                                    user.location, 
                                    user.firstName, 
                                    user.lastName,
                                    user.phone,
                                    user.userSkills,
                                    user._id
                                    )},
                error => console.log(error)
            );
        this.currentProfilePicture = document.getElementsByClassName('profile-picture')[0];
        this.userService.getUserImage('58433892c39c721b14976675')
            .subscribe(
                data =>  this.renderer.setElementProperty(this.currentProfilePicture, 'src', data),
                error => console.log(error)
            );

    }
    /**
     * Updates the current user
     */
    saveChanges() {
        this.user.phone = this.phone;
        this.user.userSkills = this.userProfileEditService.userSkills;
        this.userService.updateUser(this.user)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
    }

    /**
    * Uploads the chosen image as profile picture
    */
    upload() {
        this.userService.uploadUserImage(this.user.userId, this.imgToUpload)
            .subscribe(
                data =>  this.renderer.setElementProperty(this.currentProfilePicture, 'src', data),
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

}
