import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FlashMessagesModule } from "angular2-flash-messages";
import { BrowserModule } from "@angular/platform-browser";

import { SharedModule } from "../shared.module";
import { UserComponent } from "./user.component";
import { UserRoutingModule } from "./user.routes";
import { HomeComponent } from "./home/home.component";
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
        HomeComponent,
        ChangePasswordComponent,
        SkillSearchComponent,
        UserSearchComponent,
        UserProfileComponent,
        UserProfileEditComponent,
        UserSkillListComponent,
        ProjectCreateComponent,
        ProjectShowComponent,
        ProjectListComponent,
        TaskCreateComponent,
        TaskCreateComponent,
        FilterPipe,
        OrderByPipe
    ]
})
export class UserModule {}
