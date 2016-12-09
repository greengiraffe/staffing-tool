import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { PasswordComponent } from "./password/password.component";
import { OnboardingSkillComponent } from "./skill/onboarding-skill.component";
import { InterestComponent } from "./interest/interest.component";
import { InfoComponent } from "./info/info.component";
import { ProfileComponent } from "./profile/profile.component";
import { FinishComponent } from "./finish/finish.component";
import { OnboardingRoutingModule } from "./onboarding.routes";


@NgModule({
    imports: [
        CommonModule,
        OnboardingRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        PasswordComponent,
        OnboardingSkillComponent,
        InterestComponent,
        InfoComponent,
        ProfileComponent,
        FinishComponent,
    ]
})
export class OnboardingModule {}
