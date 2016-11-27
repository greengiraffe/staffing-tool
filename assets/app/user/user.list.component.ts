import { Component } from "@angular/core";
import {User} from "../_models/user.model";
import {UserService} from "../_services/user.service";

@Component({
    selector: 'app-user-list',
    templateUrl: './user.list.template.html'
    // styleUrls: ['./home.style.scss']
})
export class UserListComponent {
    users: User[];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(
                (users: User[]) => {
                    this.users = users;
                    console.log(this.users)
                }
            );
    }

    editUser(user: User) {
        // TODO
    }

    deleteUser(user: User) {
        // FIXME
        this.userService.deleteUser(user)
            .subscribe(
                result => console.log(result)
            );
    }
}
