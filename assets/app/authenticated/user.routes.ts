import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomeComponent } from "./home/home.component";
import { ProjectCreateComponent } from "./project/project.create.component";
import { ProjectListComponent } from "./project/project.list.component";
import { ProjectShowComponent } from "./project/project.show.component";
import { UserProfileComponent } from "./userProfile/user-profile.component";
import { UserProfileEditComponent } from "./userProfile/user-profile-edit.component";
import { TaskCreateComponent } from "./task/task.create.component";

const userRoutes: Routes = [
    {
        path: 'usr',
        children: [
            { path: '', component: HomeComponent},
            { path: 'home', component: HomeComponent},
            { path: 'profile', component: UserProfileComponent },
            { path: 'profile/edit', component: UserProfileEditComponent },
            { path: 'project/show/:id', component: ProjectShowComponent },
            { path: 'project/create', component: ProjectCreateComponent },
            { path: 'project/list/:type', component: ProjectListComponent },
            { path: 'project/list', component: ProjectListComponent },
            { path: 'project/edit/:id', component: ProjectCreateComponent }
        ]
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
