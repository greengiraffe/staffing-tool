import { Routes, RouterModule } from "@angular/router";

import { SkillsComponent } from "./skill/skills.component";
import { AuthenticationComponent } from "./auth/auth.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import {ProfileComponent} from "./onboarding/profile/profile.component";
import {InfoComponent} from "./onboarding/info/info.component";
import {InterestComponent} from "./onboarding/interest/interest.component";
import {FinishComponent} from "./onboarding/finish/finish.component";
import {PasswordComponent} from "./onboarding/password/password.component";
import {SkillComponent} from "./skill/skill.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/skills', pathMatch: 'full'},
    // { path: '', redirectTo: '/skill-manage', pathMatch: 'full' },
    { path: 'skill-manage', component: SkillsComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'onboarding/password', component: PasswordComponent},
    { path: 'onboarding/skills', component: SkillComponent},
    { path: 'onboarding/interests', component: InterestComponent},
    { path: 'onboarding/info', component: InfoComponent},
    { path: 'onboarding/profile', component: ProfileComponent},
    { path: 'onboarding/finish', component: FinishComponent
    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);