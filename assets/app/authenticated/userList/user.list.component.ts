import { Component } from "@angular/core";

import { User } from "../../_models/user.model";
import { UserService } from "../../_services/user.service";
import { SkillService } from "../../_services/skill.service";
import { SkillSearchService } from "../../_services/skill-search.service";
import { AuthService } from "../../_services/auth.service";
import { RightsService } from "../../_services/rights.service";

@Component({
    selector: 'app-user-list',
    templateUrl: './user.list.template.html',
    styleUrls: ['user.list.style.scss'],
    providers: [SkillService, SkillSearchService]
})
export class UserListComponent {
    private currentUserCanRemove = false;
    private currentUser: User;
    users: User[];

    constructor(private userService: UserService,
                private rightsService: RightsService,
                private authService: AuthService) {}

    ngOnInit() {
        this.currentUser = this.authService.currentUser();

        this.userService.getUsers()
            .subscribe(
                (users: User[]) => {
                    this.users = users;
                }
            );

        if (this.currentUser) {
            this.currentUserCanRemove = this.rightsService.canRemoveUser(this.currentUser);
        }
    }

    editUser(user: User) {
        // TODO
    }

    deleteUser(user: User, index: number) {
        this.userService.deleteUser(user)
            .subscribe(
                result => console.log(result)
            );
    }
}
