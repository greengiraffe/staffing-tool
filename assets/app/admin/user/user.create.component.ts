import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
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
            location: ['', <any>Validators.required],
            role: ['', <any>Validators.required],
            password: ['', [<any>Validators.required, <any>Validators.minLength(8)]],
            confirmPassword: ['', [<any>Validators.required, <any>Validators.minLength(8)]],
        });
    }

    onSubmit(form: NgForm) {
        // Create
        const user = new User(
            form.value.email,
            form.value.password,
            form.value.role,
            form.value.location,
            form.value.firstName,
            form.value.lastName);
        this.userService.createUser(user)
            .subscribe(
                //data => console.log(data),
                data => {this._flash.show("User successfully added", { cssClass: 'alert-success', timeout: 5000 });},
                //error => console.error(error)
                error => {this._flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });}
            );
        form.reset();
    }
}
