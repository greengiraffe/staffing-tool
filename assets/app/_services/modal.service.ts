import { Injectable } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";

@Injectable()
export class ModalService {
    private modals: ModalComponent[];

    constructor() {
        this.modals = [];
    }

    registerModal(newModal: ModalComponent): void {
        const modal = this.findModal(newModal.modalId);

        // Delete existing to replace the modal
        if (modal) {
            this.modals.splice(this.modals.indexOf(modal),1);
        }

        this.modals.push(newModal);
    }

    open(modalId: string): void {
        const modal = this.findModal(modalId);

        if (modal) {
            modal.isOpen = true;
            modal.hideBodyScroll();
        }
    }

    close(modalId: string, checkBlocking = false): void {
        const modal = this.findModal(modalId);

        if (modal) {
            if (checkBlocking && modal.isBlocking) {
                return;
            }
            modal.isOpen = false;
            modal.addBodyScroll();
        }
    }

    private findModal(modalId: string): ModalComponent {
        return this.modals.find(item => {
           return item.modalId === modalId
        });
    }
}
