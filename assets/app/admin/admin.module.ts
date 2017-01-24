import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FlashMessagesModule } from "angular2-flash-messages";
import { SharedModule } from "../shared.module";

import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin.routes";
import { SkillCreateComponent } from "./skill/skill.create.component";
import { SkillListComponent } from "./skill/skill.list.component";
import { SkillsComponent } from "./skill/skills.component";
import { UserCreateComponent } from "./userCreate/user.create.component";
import { ModalComponent } from "../modal/modal.component";



@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AdminRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FlashMessagesModule
    ],
    declarations: [
        AdminComponent,
        SkillCreateComponent,
        SkillListComponent,
        SkillsComponent,
        UserCreateComponent
    ]
})
export class AdminModule {}
