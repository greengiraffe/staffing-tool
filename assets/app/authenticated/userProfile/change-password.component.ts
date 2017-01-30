import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../../_services/auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.template.html',
  styleUrls: ['change-password.style.scss']
})

export class ChangePasswordComponent implements OnInit{
    @Output() onPasswordChange = new EventEmitter();

    changeForm: FormGroup;

    constructor(private userService: UserService,
                private authService: AuthService,
                private _fb: FormBuilder,) {}

    ngOnInit(){
        this.changeForm = this._fb.group({
            oldPw: ['', Validators.required],
            newPw: this._fb.group({
                password: ['', [Validators.required, Validators.minLength(8), this.noCapital, this.noNumber]],
                confirm: ['', [Validators.required, Validators.minLength(8)]]
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

    noCapital(control): any {
        if(!control.value.match(/(?=.*[A-Z])/)) {
            return {noCapital: true};
        } else {
            return null;
        }
    }

    noNumber(control): any {
        if(!control.value.match(/^(?=.*\d).+$/)) {
            return {noNumber: true};
        } else {
            return null;
        }
    }

    reset() {
        this.changeForm.reset({
            oldPw: '',
            newPw: {
                password: '',
                confirm: ''
            }
        });
    }

    setWrongPasswordError() {
        this.changeForm.setErrors({
            'wrongPassword': true
        });
    }
}
