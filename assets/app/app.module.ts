import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { provideAuth, AuthHttp, AuthConfig, AUTH_PROVIDERS } from "angular2-jwt";
import { FlashMessagesModule } from "angular2-flash-messages";

import { AuthService } from "./_services/auth.service";
import { UserService } from "./_services/user.service";
import { NavBarService } from "./_services/navbar.service";
import { FilterService } from "./_services/filter.service";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { SharedModule } from "./shared.module";

import { NavComponent } from "./nav/nav.component";
import { LoginComponent } from "./login/login.component";
import { UserModule } from "./authenticated/user.module";
import { AdminModule } from "./admin/admin.module";

import { ModalService } from "./_services/modal.service";
import { FooterComponent } from "./footer/footer.component";
import { MatchService } from "./_services/match.service";
import { RightsService } from "./_services/rights.service";

import { CanActivateAuthGuard } from "./app.routing.guard.auth";

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FlashMessagesModule,
        AdminModule,
        UserModule,
        AppRoutingModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        NavComponent,
        FooterComponent
    ],
    providers: [
        UserService,
        AuthService,
        RightsService,
        FilterService,
        MatchService,
        ModalService,
        NavBarService,
        CanActivateAuthGuard,
        AuthHttp,
         provideAuth({
          headerName: 'Authorization',
          headerPrefix: 'Bearer',
          tokenName: 'id_token',
          tokenGetter: (() => localStorage.getItem('id_token')),
          globalHeaders: [{'Content-Type':'application/json'}],
          noJwtError: true
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
