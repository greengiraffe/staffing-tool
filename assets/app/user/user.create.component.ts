import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import {User} from "../_models/user.model";
import {UserService} from "../_services/user.service";

@Component({
    selector: 'app-user-create',
    templateUrl: './user.create.template.html'
    // styleUrls: ['./home.style.scss']
})
export class UserCreateComponent {
    constructor(private userService: UserService) {}

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
                data => console.log(data),
                error => console.error(error)
            );
        form.resetForm();
    }
}


