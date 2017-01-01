import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FlashMessagesModule } from "angular2-flash-messages";
import { BrowserModule } from "@angular/platform-browser";

import { UserComponent } from "./user.component";
import { UserRoutingModule } from "./user.routes";
import { HomeComponent } from "./home/home.component";
import { ProjectCreateComponent } from "./project/project.create.component";
import { ProjectListComponent } from "./project/project.list.component";
import { ProjectEditComponent } from "./project/project.edit.component";
import { ProjectShowComponent } from "./project/project.show.component";
import { ChangePasswordComponent } from "./userProfile/change-password.component";
import { SkillSearchComponent } from "./userProfile/skill-search.component";
import { UserProfileComponent } from "./userProfile/user-profile.component";
import { UserProfileEditComponent } from "./userProfile/user-profile-edit.component";
import { UserSkillListComponent } from "./userProfile/user-skill-list.component";
import { TaskCreateComponent } from "./task/task-create.component";
import { FilterPipe } from "../_pipes/filter.pipe";
import { ModalComponent } from "../modal/modal.component";


@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FlashMessagesModule
    ],
    declarations: [
        UserComponent,
        HomeComponent,
        ChangePasswordComponent,
        SkillSearchComponent,
        UserProfileComponent,
        UserProfileEditComponent,
        UserSkillListComponent,
        ProjectCreateComponent,
        ProjectEditComponent,
        ProjectShowComponent,
        ProjectListComponent,
        TaskCreateComponent,
        ModalComponent,
        TaskCreateComponent,
        FilterPipe
    ]
})
export class UserModule {}
