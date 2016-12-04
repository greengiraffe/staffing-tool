import { Component } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.template.html',
  styleUrls: ['user-profile.style.scss']
})

export class ChangePasswordComponent {

  constructor(private userService: UserService) {}

  onSubmit(form: any, currentPassword: string, newPassword: string, newPasswordConfirm: string) {
    if(newPassword.localeCompare(newPasswordConfirm) === 0) {
        this.userService.updateUserPassword("58433892c39c721b14976675", currentPassword, newPassword)
            .subscribe(
                data => form.reset(),
                error => console.log(error)
            );
    } else {
      alert("New passwords do not match");
    }
  }

}
