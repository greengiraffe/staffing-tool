import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { SkillComponent } from "./skill/skill.component";
import { SkillListComponent } from "./skill/skill.list.component";
import { SkillCreateComponent } from "./skill/skill.create.component";
import { SkillsComponent } from "./skill/skills.component";
import { routing } from "./app.routing";
import { LoginComponent } from "./login/login.component";
import { UserService } from "./_services/user.service";
import { FinishComponent } from "./onboarding/finish/finish.component";
import { ProfileComponent } from "./onboarding/profile/profile.component";
import { InfoComponent } from "./onboarding/info/info.component";
import { InterestComponent } from "./onboarding/interest/interest.component";
import { PasswordComponent } from "./onboarding/password/password.component";
import { OnboardingSkillComponent } from "./onboarding/skill/onboarding-skill.component";
import { HomeComponent } from "./home/home.component";
import { UserCreateComponent } from "./user/user.create.component";
import { UserListComponent } from "./user/user.list.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserProfileEditComponent } from "./user-profile/user-profile-edit.component";
import { NavComponent } from "./nav.component";
import { ProjectComponent } from "./project/project.component";
import { UserSkillListComponent } from "./user-profile/user-skill-list.component";
import { AuthService } from "./_services/auth.service";
import { provideAuth } from "angular2-jwt";
import { FilterPipe } from "./_pipes/filter.pipe";
import { SkillSearchComponent } from "./user-profile/skill-search.component";
import { FlashMessagesModule } from "angular2-flash-messages";
import { ChangePasswordComponent } from './user-profile/change-password.component';

@NgModule({
    declarations: [
        FilterPipe,

        AppComponent,
        SkillComponent,
        SkillListComponent,
        SkillCreateComponent,
        SkillsComponent,
        HomeComponent,
        LoginComponent,
        AppComponent,
        PasswordComponent,
        SkillComponent,
        InterestComponent,
        InfoComponent,
        ProfileComponent,
        FinishComponent,
        OnboardingSkillComponent,
        UserListComponent,
        UserCreateComponent,
        UserProfileComponent,
        UserProfileEditComponent,
        NavComponent,
        ProjectComponent,
<<<<<<< 494c02c15cfaca32f0dac3a9c01aba9f96fb6e60
        UserSkillListComponent,
        SkillSearchComponent
=======
        SkillSuggestComponent,
        UserSkillListComponent,
        ChangePasswordComponent
>>>>>>> [#62] feat (change-password) -> add change-password component
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule,
        FlashMessagesModule
    ],
    providers: [
        UserService,
        AuthService,
    provideAuth({
        headerName: 'Authorization',
        headerPrefix: 'Bearer',
        tokenName: 'id_token',
        tokenGetter: (() => localStorage.getItem('token')),
        globalHeaders: [{'Content-Type':'application/json'}],
        noJwtError: true,
        noTokenScheme: true
    })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
