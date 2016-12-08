import { Component } from "@angular/core";
import { NgForm, FormGroup } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";


import { User } from "../../_models/user.model";
import { UserService } from "../../_services/user.service";


@Component({
    selector: 'app-user-create',
    templateUrl: './user.create.template.html'
    // styleUrls: ['./home.style.scss']
})
export class UserCreateComponent {
    createUserForm: FormGroup;

    constructor(private userService: UserService,
                private _flashMessagesService: FlashMessagesService) {}

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
                data => {this._flashMessagesService.show("User successfully added", { cssClass: 'alert-success', timeout: 5000 });},
                //error => console.error(error)
                error => {this._flashMessagesService.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });}
            );
        form.reset();
    }
}
