import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../_models/user.model";
import {AuthService} from "../_services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.template.html',
    styleUrls: ['./login.style.scss']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
        let user = new User(this.loginForm.value.email, this.loginForm.value.password);
            this.authService.login(user)
                .subscribe(
                    data => this.router.navigateByUrl('/home'),
                    error => console.error(error)
                );
            this.loginForm.reset();

        }
        // const user = new User(this.myForm.value.email, this.myForm.value.password);
        // this.authService.signin(user)
        //     .subscribe(
        //         data => {
        //             // localStorage.setItem('token', data.token);
        //             // localStorage.setItem('userId', data.userId);
        //             this.router.navigateByUrl('/');
        //         },
        //         error => console.error(error)
        //     );
        // this.myForm.reset();
        // this.router.navigateByUrl('home');

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
