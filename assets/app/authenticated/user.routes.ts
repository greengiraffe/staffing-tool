import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { UserComponent } from "./user.component";
import { HomeComponent } from "./home/home.component";
import { ProjectComponent } from "./project/project.component";

const userRoutes: Routes = [
    {
        path: 'usr',
        // component: UserComponent,
        children: [
            {
                path: '',
                children: [
                    { path: 'dashboard', component: HomeComponent },
                    { path: 'profile', component: HomeComponent },
                    { path: 'project', component: ProjectComponent },
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
