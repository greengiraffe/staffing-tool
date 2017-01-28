import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from "../../../_services/modal.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../_services/auth.service";
import { User } from "../../../_models/user.model";
import { RightsService } from "../../../_services/rights.service";

@Component({
    selector: 'app-user-card',
    templateUrl: 'user.card.template.html',
    styleUrls: ['user.card.style.scss']
})

export class UserCardComponent {

    @Input() user: User;
    @Output("onDelete") onDelete = new EventEmitter();
    url: string;

    private currentUserCanDelete = false;
    private deleteUserModalId = "deleteUserModal" + (0|Math.random()*6.04e7).toString(36);

    constructor(private modalService: ModalService,
                private authService: AuthService,
                private rightsService: RightsService,
                private router: Router) {}

    ngOnInit() {
        const user = this.authService.currentUser();

        if (user) {
            this.currentUserCanDelete = this.rightsService.canRemoveUser(user);
        }
        this.url = sessionStorage.getItem(this.user._id) ? sessionStorage.getItem(this.user._id) : '/img/usersmall.png';
    }

    deleteUser() {
        this.onDelete.emit(this.user);
        this.modalService.close(this.deleteUserModalId)
    }
}
