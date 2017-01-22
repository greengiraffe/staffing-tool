import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { LoginComponent } from "./login/login.component";
import { UserProfileComponent } from "./authenticated/userProfile/user-profile.component";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'home', component: UserProfileComponent},
    { path: 'auth/login', component: LoginComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
