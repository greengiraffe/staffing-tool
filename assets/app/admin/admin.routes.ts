import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AdminComponent } from "./admin.component";
import { UserCreateComponent } from "./user/user.create.component";
import { UserListComponent } from "./user/user.list.component";
import { SkillComponent } from "./skill/skill.component";

const adminRoutes: Routes = [
    {
        path: 'admin',
        // component: AdminComponent,
        children: [
            {
                path: '',
                children: [
                    { path: 'user/create', component: UserCreateComponent },
                    { path: 'user/list', component: UserListComponent },
                    { path: 'skill', component: SkillComponent },
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
