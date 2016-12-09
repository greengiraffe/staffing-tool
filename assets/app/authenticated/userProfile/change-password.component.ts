import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.template.html',
  styleUrls: ['user-profile.style.scss']
})

export class ChangePasswordComponent implements OnInit{
    changeForm: FormGroup;

    constructor(private userService: UserService) {}

    ngOnInit(){
        this.changeForm = new FormGroup({
            oldPw: new FormControl(null, Validators.required),
            newPw: new FormGroup({
                password: new FormControl(null, Validators.required),
                confirm: new FormControl(null, Validators.required)
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

    onSubmit(f: FormGroup) {
        this.userService.updateUserPassword(
            localStorage.getItem("userId"),
            f.value.oldPw,
            f.value.password)
            .subscribe(
                data => f.reset(),
                error => console.log(error)
            );
    }
}
