import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { SkillComponent } from "./skill/skill.component";
import { SkillListComponent } from "./skill/skill-list.component";
import { SkillInputComponent } from "./skill/skill-input.component";
import { SkillsComponent } from "./skill/skills.component";
import { AuthenticationComponent } from "./auth/auth.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { LogoutComponent } from "./auth/logout.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { AuthService } from "./auth/auth.service";
import {FinishComponent} from "./onboarding/finish/finish.component";
import {ProfileComponent} from "./onboarding/profile/profile.component";
import {InfoComponent} from "./onboarding/info/info.component";
import {InterestComponent} from "./onboarding/interest/interest.component";
import {PasswordComponent} from "./onboarding/password/password.component";

@NgModule({
    declarations: [
        AppComponent,
        SkillComponent,
        SkillListComponent,
        SkillInputComponent,
        SkillsComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        AppComponent,
        PasswordComponent,
        SkillComponent,
        InterestComponent,
        InfoComponent,
        ProfileComponent,
        FinishComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {

}