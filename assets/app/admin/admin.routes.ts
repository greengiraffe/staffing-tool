import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { UserCreateComponent } from "./userCreate/user.create.component";
import { SkillListComponent } from "./skillList/skill.list.component";

const adminRoutes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: '',
                children: [
                    { path: 'user/create', component: UserCreateComponent },
                    { path: 'skillList', component: SkillListComponent }
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
