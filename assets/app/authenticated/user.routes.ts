import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomeComponent } from "./home/home.component";
import { ProjectCreateComponent } from "./project/project.create.component";
import { UserProfileComponent } from "./userProfile/user-profile.component";

const userRoutes: Routes = [
    {
        path: 'usr',
        // component: UserComponent,
        children: [
            {
                path: '',
                children: [
                    { path: 'dashboard', component: HomeComponent },
                    { path: 'profile', component: UserProfileComponent },
                    { path: 'project', component: ProjectCreateComponent },
                ]
            }
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
