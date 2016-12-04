import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { UserComponent } from "./user.component";
import { UserRoutingModule } from "./user.routes";
import { HomeComponent } from "./home/home.component";
import { ProjectComponent } from "./project/project.component";
import { ChangePasswordComponent } from "./userProfile/change-password.component";
import { SkillSearchComponent } from "./userProfile/skill-search.component";
import { UserProfileComponent } from "./userProfile/user-profile.component";
import { UserProfileEditComponent } from "./userProfile/user-profile-edit.component";
import { UserSkillListComponent } from "./userProfile/user-skill-list.component";


@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule
    ],
    declarations: [
        UserComponent,
        HomeComponent,
        ProjectComponent,
        ChangePasswordComponent,
        SkillSearchComponent,
        UserProfileComponent,
        UserProfileEditComponent,
        UserSkillListComponent
    ]
})
export class UserModule {}
