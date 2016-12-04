import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.template.html',
  styleUrls: ['user-profile.style.scss']
})

export class ChangePasswordComponent {

  onSubmit(form: any, currentPassword: string, newPassword: string, newPasswordConfirm: string) {
    console.log(currentPassword);
    console.log(newPassword);
    console.log(newPasswordConfirm);
    if(newPassword.localeCompare(newPasswordConfirm)===0) {
      console.log("TRUE");
      form.reset();
    } else {
      console.log("false");
    }
  }

}
