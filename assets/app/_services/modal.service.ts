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
            modal.open();
        }
    }

    close(modalId: string, checkBlocking = false): void {
        const modal = this.findModal(modalId);
        console.log("closing", modal);

        if (modal) {
            modal.close(checkBlocking);
        }
    }

    //to prevent memory leak
    clearAllModals(): void {
        this.modals = [];
    }

    private findModal(modalId: string): ModalComponent {
        return this.modals.find(item => {
           return item.modalId === modalId
        });
    }
}
