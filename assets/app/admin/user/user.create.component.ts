import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";

import { User } from "../../_models/user.model";
import { UserService } from "../../_services/user.service";


@Component({
    selector: 'app-user-create',
    templateUrl: './user.create.template.html'
    // styleUrls: ['./home.style.scss']
})
export class UserCreateComponent implements OnInit {
    createUserForm: FormGroup;

    constructor(private userService: UserService,
                private _fb: FormBuilder,
                private _flash: FlashMessagesService) {}

    ngOnInit() {
        this.createUserForm = this._fb.group({
            firstName: ['', [<any>Validators.required, <any>Validators.minLength(2)]],
            lastName: ['', [<any>Validators.required, <any>Validators.minLength(2)]],
            email: ['', <any>Validators.required],
            location: ['Berlin HQ', <any>Validators.required],
            role: ['user', <any>Validators.required],
            pw: this._fb.group({
                password: ['', [<any>Validators.required, <any>Validators.minLength(8)]],
                confirm: ['', [<any>Validators.required, <any>Validators.minLength(8)]],

            }, this.matchPassword)
        });
    }

    matchPassword(group): any {
        let password = group.controls.password;
        let confirm = group.controls.confirm;

        // Don't kick in until user touches both fields
        if (password.pristine || confirm.pristine) {
            return null;
        }

        // Mark group as touched so we can add invalid class easily
        group.markAsTouched();

        if (password.value === confirm.value) {
            return null;
        }

        return {
            isValid: false
        };
    }

    onSubmit(form: FormGroup) {
        // Create
        const user = new User(
            form.get('email').value,
            form.get('pw').get('password').value,
            form.get('role').value,
            form.get('location').value,
            form.get('firstName').value,
            form.get('lastName').value
        );
        this.userService.createUser(user)
            .subscribe(
                //data => console.log(data),
                data => {this._flash.show("User successfully added", { cssClass: 'alert-success', timeout: 5000 });},
                //error => console.error(error)
                error => {this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });}
            );
        // form.reset();
    }
}
