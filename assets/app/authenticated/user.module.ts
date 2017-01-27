import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FlashMessagesModule } from "angular2-flash-messages";
import { BrowserModule } from "@angular/platform-browser";

import { SharedModule } from "../shared.module";
import { UserComponent } from "./user.component";
import { UserCardComponent } from "./userList/userCard/user.card.component";
import { UserRoutingModule } from "./user.routes";
import { UserListComponent } from "./userList/user.list.component";
import { ProjectCreateComponent } from "./project/project.create.component";
import { ProjectListComponent } from "./project/project.list.component";
import { ProjectShowComponent } from "./project/project.show.component";
import { ChangePasswordComponent } from "./userProfile/change-password.component";
import { SkillSearchComponent } from "./userProfile/skill-search.component";
import { UserSearchComponent } from "./userSearch/user.search.component";
import { UserProfileComponent } from "./userProfile/user-profile.component";
import { UserProfileEditComponent } from "./userProfile/user-profile-edit.component";
import { UserSkillListComponent } from "./userProfile/user-skill-list.component";
import { TaskCreateComponent } from "./task/task.create.component";
import { FilterPipe } from "../_pipes/filter.pipe";
import { OrderByPipe } from "../_pipes/orderBy.pipe";
import { FilterNamesPipe } from "../_pipes/filterNames.pipe";
import { PastProjectsPipe } from "../_pipes/pastProjects.pipe";
import { SafeUrlPipe } from "../_pipes/safeUrl.pipe";

import { ProjectCardComponent } from "./project/card/project.card.component";
import { TaskCardComponent } from "./task/card/task.card.component";


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UserRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FlashMessagesModule
    ],
    declarations: [
        ProjectCardComponent,
        TaskCardComponent,
        UserComponent,
        UserCardComponent,
        ChangePasswordComponent,
        SkillSearchComponent,
        UserSearchComponent,
        UserProfileComponent,
        UserProfileEditComponent,
        UserListComponent,
        UserSkillListComponent,
        ProjectCreateComponent,
        ProjectShowComponent,
        ProjectListComponent,
        TaskCreateComponent,
        TaskCreateComponent,
        FilterPipe,
        OrderByPipe,
        FilterNamesPipe,
        PastProjectsPipe,
        SafeUrlPipe
    ]
})
export class UserModule {}
