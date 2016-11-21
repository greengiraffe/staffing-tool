import { Routes, RouterModule } from "@angular/router";

import { SkillsComponent } from "./skill/skills.component";
import { AuthenticationComponent } from "./auth/auth.component";
// import { AUTH_ROUTES } from "./auth/auth.routes";
import { ProfileComponent} from "./onboarding/profile/profile.component";
import { InfoComponent} from "./onboarding/info/info.component";
import { InterestComponent} from "./onboarding/interest/interest.component";
import { FinishComponent} from "./onboarding/finish/finish.component";
import { PasswordComponent} from "./onboarding/password/password.component";
import { SkillComponent} from "./skill/skill.component";
import { OnboardingSkillComponent } from "./onboarding/skill/onboarding-skill.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";

import { UserCreateComponent } from "./user/user.create.component";
import { UserListComponent } from "./user/user.list.component";
import { SkillListComponent } from "./skill/skill.list.component";
import { SkillCreateComponent } from "./skill/skill.create.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

    { path: 'auth/login', component: LoginComponent },
    { path: 'home', component: HomeComponent },

    { path: 'usr/create', component: UserCreateComponent },
    { path: 'usr/list', component: UserListComponent },

    { path: 'skill-manage/list', component: SkillListComponent },
    { path: 'skill-manage/create', component: SkillCreateComponent },
    { path: 'skill-manage', component: SkillsComponent},

    { path: 'onboarding/password', component: PasswordComponent},
    { path: 'onboarding/skills', component: OnboardingSkillComponent},
    { path: 'onboarding/interests', component: InterestComponent},
    { path: 'onboarding/info', component: InfoComponent},
    { path: 'onboarding/profile', component: ProfileComponent},
    { path: 'onboarding/finish', component: FinishComponent},

    { path: 'profile', component: UserProfileComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
