import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { UserCreateComponent } from "./userCreate/user.create.component";
import { SkillsComponent } from "./skill/skills.component";

const adminRoutes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: '',
                children: [
                    { path: 'user/create', component: UserCreateComponent },
                    { path: 'skill', component: SkillsComponent }
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
