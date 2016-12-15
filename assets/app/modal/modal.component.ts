import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from "../_services/modal.service";

@Component({
    selector: 'app-modal',
    templateUrl: 'modal.template.html',
    styles: [`
      .modal {
        display: block;
      }
    `],
    host: {
        '(document:keyup)': 'keyup($event)'
    }
})
export class ModalComponent implements OnInit {
    @Input('modal-id') modalId: string;
    @Input('modal-title') modalTitle: string;
    @Input('is-blocking') isBlocking = false;
    isOpen: boolean = false;

    constructor(private modalService: ModalService) {
    }

    ngOnInit() {
        this.modalService.registerModal(this);
    }

    private close(checkBlocking = false) {
        this.modalService.close(this.modalId, checkBlocking);
    }

    private keyup(event: KeyboardEvent) {
        if (event.keyCode === 27) {
            // Escape key pressed
            this.modalService.close(this.modalId, true);
        }
    }
}