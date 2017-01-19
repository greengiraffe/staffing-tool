import { Component } from "@angular/core";

import { User } from "../../_models/user.model";
import { UserService } from "../../_services/user.service";
import { ModalService } from "../../_services/modal.service";
import { AuthService } from "../../_services/auth.service";

@Component({
    selector: 'app-user-list',
    templateUrl: './user.list.template.html',
    styleUrls: ['user.list.style.scss']
})
export class UserListComponent {
    private deleteUserModalIds = new Array<string>();
    private currentUserCanRemove = false;
    private currentUser: User;
    users: User[];

    constructor(private userService: UserService,
                private authService: AuthService,
                private modalService: ModalService) {}

    ngOnInit() {
        this.currentUser = this.authService.currentUser();

        this.userService.getUsers()
            .subscribe(
                (users: User[]) => {
                    this.users = users;
                    this.users.forEach((user, index) => {
                        this.deleteUserModalIds.push("deleteUserModalId" + index);
                    });
                }
            );

        if (this.currentUser) {
            this.currentUserCanRemove = this.currentUser.role === 'admin' || this.currentUser.role === 'user_creator';
        }
    }

    editUser(user: User) {
        // TODO
    }

    deleteUser(user: User, index: number) {
        this.deleteUserModalIds.splice(index,1);
        this.userService.deleteUser(user)
            .subscribe(
                result => console.log(result)
            );
    }
}
