import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { SkillComponent } from "./skill/skill.component";
import { SkillListComponent } from "./skill/skill.list.component";
import { SkillCreateComponent } from "./skill/skill.create.component";
import { SkillsComponent } from "./skill/skills.component";
import { AuthenticationComponent } from "./auth/auth.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { LogoutComponent } from "./auth/logout.component";
import { SignupComponent } from "./auth/signup.component";
import { LoginComponent } from "./login/login.component";
import { UserService } from "./_services/user.service";
import { FinishComponent } from "./onboarding/finish/finish.component";
import { ProfileComponent } from "./onboarding/profile/profile.component";
import { InfoComponent } from "./onboarding/info/info.component";
import { InterestComponent } from "./onboarding/interest/interest.component";
import { PasswordComponent } from "./onboarding/password/password.component";
import { OnboardingSkillComponent } from "./onboarding/skill/onboarding-skill.component";
import { SkillSuggestionsComponent } from "./onboarding/skill/skill-suggestions.component"
import { HomeComponent } from "./home/home.component";
import { UserCreateComponent } from "./user/user.create.component";
import { UserListComponent } from "./user/user.list.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

@NgModule({
    declarations: [
        AppComponent,
        SkillComponent,
        SkillListComponent,
        SkillSuggestionsComponent,
        SkillCreateComponent,
        SkillsComponent,
        AuthenticationComponent,
        HomeComponent,
        LoginComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
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
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {

}