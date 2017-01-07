import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { UserCreateComponent } from "./user/user.create.component";
import { UserListComponent } from "./user/user.list.component";
import { SkillsComponent } from "./skill/skills.component";

const adminRoutes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: '',
                children: [
                    { path: 'user/create', component: UserCreateComponent },
                    { path: 'user/list', component: UserListComponent },
                    { path: 'skill', component: SkillsComponent },
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
