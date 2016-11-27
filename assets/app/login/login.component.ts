import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../_models/user.model";
import { UserService } from "../_services/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.template.html',
    styleUrls: ['./login.style.scss']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private UserService: UserService, private router: Router) {}

    onSubmit() {
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
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}
