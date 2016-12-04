import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { PasswordComponent } from "./password/password.component";
import { OnboardingSkillComponent } from "./skill/onboarding-skill.component";
import { InterestComponent } from "./interest/interest.component";
import { InfoComponent } from "./info/info.component";
import { ProfileComponent } from "./profile/profile.component";
import { FinishComponent } from "./finish/finish.component";


const onboardingRoutes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: '',
                children: [
                    { path: 'password', component: PasswordComponent},
                    { path: 'skills', component: OnboardingSkillComponent},
                    { path: 'interests', component: InterestComponent},
                    { path: 'info', component: InfoComponent},
                    { path: 'profile', component: ProfileComponent},
                    { path: 'finish', component: FinishComponent},
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(onboardingRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class OnboardingRoutingModule {}
