import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./authenticated/home/home.component";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

    { path: 'auth/login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
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
