import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AdminComponent } from "./admin.component";
import { UserCreateComponent } from "./user/user.create.component";
import { UserListComponent } from "./user/user.list.component";

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                children: [
                    { path: 'user', component: UserCreateComponent },
                    { path: 'profile', component: UserListComponent },
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
