import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { provideAuth } from "angular2-jwt";
import { FlashMessagesModule } from "angular2-flash-messages";

import { AuthService } from "./_services/auth.service";
import { UserService } from "./_services/user.service";

import { FilterPipe } from "./_pipes/filter.pipe";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";

import { NavComponent } from "./nav.component";
import { LoginComponent } from "./login/login.component";
import { OnboardingModule } from "./onboarding/onboarding.module";
import { UserModule } from "./authenticated/user.module";
import { AdminModule } from "./admin/admin.module";


@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FlashMessagesModule,
        AdminModule,
        UserModule,
        OnboardingModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,

        LoginComponent,
        NavComponent,
    ],
    providers: [
        UserService,
        AuthService,
    provideAuth({
        headerName: 'Authorization',
        headerPrefix: 'Bearer',
        tokenName: 'id_token',
        tokenGetter: (() => localStorage.getItem('token')),
        globalHeaders: [{'Content-Type':'application/json'}],
        noJwtError: true,
        noTokenScheme: true
    })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
