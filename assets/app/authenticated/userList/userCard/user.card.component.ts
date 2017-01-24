import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from "../../../_services/modal.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../_services/auth.service";
import { User } from "../../../_models/user.model";

@Component({
    selector: 'app-user-card',
    templateUrl: 'user.card.template.html',
    styleUrls: ['user.card.style.scss']
})

export class UserCardComponent {

    @Input() user: User;
    @Output("onDelete") onDelete = new EventEmitter();

    private currentUserCanDelete = false;
    private deleteUserModalId = "deleteUserModal" + (0|Math.random()*6.04e7).toString(36);

    constructor(private modalService: ModalService, private authService: AuthService, private router: Router) {}

    ngOnInit() {
        const user = this.authService.currentUser();

        if (user) {
            this.currentUserCanDelete = user.role === "admin";
        }
    }

    deleteUser() {
        this.onDelete.emit(this.user);
        this.modalService.close(this.deleteUserModalId)
    }
}
