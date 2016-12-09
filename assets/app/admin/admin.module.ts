import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FlashMessagesModule } from "angular2-flash-messages";

import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin.routes";
import { SkillComponent } from "./skill/skill.component";
import { SkillCreateComponent } from "./skill/skill.create.component";
import { SkillListComponent } from "./skill/skill.list.component";
import { SkillsComponent } from "./skill/skills.component";
import { UserCreateComponent } from "./user/user.create.component";
import { UserListComponent } from "./user/user.list.component";


@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FlashMessagesModule
    ],
    declarations: [
        AdminComponent,
        SkillComponent,
        SkillCreateComponent,
        SkillListComponent,
        SkillsComponent,
        UserCreateComponent,
        UserListComponent
    ]
})
export class AdminModule {}
