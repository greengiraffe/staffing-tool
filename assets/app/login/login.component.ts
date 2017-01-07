import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../_models/user.model";
import { AuthService } from "../_services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
    selector: 'app-login',
    templateUrl: './login.template.html',
    styleUrls: ['./login.style.scss']
})
export class LoginComponent implements OnInit{
    loginForm: FormGroup;

    constructor(private authService: AuthService,
                private router: Router,
                private _flash: FlashMessagesService) {}

    onSubmit() {
        let user = new User(this.loginForm.value.email, this.loginForm.value.password);
            this.authService.login(user)
                .subscribe(
                    data => {
                        this.router.navigateByUrl('/usr/profile');
                        this.loginForm.reset();
                    },
                    error => {
                        this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });
                    }
                );
        }

    ngOnInit(){
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}
