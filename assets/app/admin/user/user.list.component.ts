import { Component } from "@angular/core";

import { User } from "../../_models/user.model";
import { UserService } from "../../_services/user.service";
import { ModalService } from "../../_services/modal.service";

@Component({
    selector: 'app-user-list',
    templateUrl: './user.list.template.html'
    // styleUrls: ['./home.style.scss']
})
export class UserListComponent {
    users: User[];
    deleteUserModalIds = new Array<string>();
    userRole: string;

    constructor(private userService: UserService,
                private modalService: ModalService) {}

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(
                (users: User[]) => {
                    this.users = users;
                    this.users.forEach((user, index) => {
                        this.deleteUserModalIds.push("deleteUserModalId" + index);
                        console.log(this.deleteUserModalIds[index]);
                    });
                }
            );
        this.userRole = localStorage.getItem('role');
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
