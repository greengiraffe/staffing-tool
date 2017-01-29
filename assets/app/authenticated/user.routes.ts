import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { ProjectCreateComponent } from "./project/project.create.component";
import { ProjectListComponent } from "./project/project.list.component";
import { ProjectShowComponent } from "./project/project.show.component";
import { UserProfileComponent } from "./userProfile/user-profile.component";
import { UserListComponent } from "./userList/user.list.component";
import { TaskCreateComponent } from "./task/task.create.component";
import { CanActivateAuthGuard } from '../app.routing.guard.auth';


const userRoutes: Routes = [
    {
        path: 'user',
        children: [
            { path: '', component: UserProfileComponent, canActivate: [CanActivateAuthGuard] },
            { path: 'profile', component: UserProfileComponent, canActivate: [CanActivateAuthGuard] },
            { path: 'project/show/:id', component: ProjectShowComponent, canActivate: [CanActivateAuthGuard] },
            { path: 'project/create', component: ProjectCreateComponent, canActivate: [CanActivateAuthGuard] },
            { path: 'project/list/:type', component: ProjectListComponent, canActivate: [CanActivateAuthGuard] },
            { path: 'project/list', component: ProjectListComponent, canActivate: [CanActivateAuthGuard] },
            { path: 'project/edit/:id', component: ProjectCreateComponent, canActivate: [CanActivateAuthGuard] },
            { path: 'list', component: UserListComponent, canActivate: [CanActivateAuthGuard]}
        ],
        canActivate: [CanActivateAuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule {}
