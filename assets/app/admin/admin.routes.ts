import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { UserCreateComponent } from "./userCreate/user.create.component";
import { SkillListComponent } from "./skillList/skill.list.component";
import { CanActivateAuthGuard } from '../app.routing.guard.auth';

const adminRoutes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: '',
                children: [
                    { path: 'user/create', component: UserCreateComponent, canActivate: [CanActivateAuthGuard]},
                    { path: 'skills', component: SkillListComponent, canActivate: [CanActivateAuthGuard]}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}
