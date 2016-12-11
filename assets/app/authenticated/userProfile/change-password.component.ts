import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.template.html',
  styleUrls: ['user-profile.style.scss']
})

export class ChangePasswordComponent implements OnInit{
    changeForm: FormGroup;
    formsVisible = false;

    constructor(private userService: UserService,
                private _fb: FormBuilder,) {}

    ngOnInit(){
        this.changeForm = this._fb.group({
            oldPw: ['', Validators.required],
            newPw: this._fb.group({
                password: ['', Validators.required],
                confirm: ['', Validators.required]
            }, { validator: this.matchPassword })
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
        this.userService.updateUserPassword(
            localStorage.getItem("userId"),
            form['oldPw'],
            form['newPw']['password'])
            .subscribe(
                data => this.changeForm.reset(),
                error => console.log(error)
            );
    }
}
