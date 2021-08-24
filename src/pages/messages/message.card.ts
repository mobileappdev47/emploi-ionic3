import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    templateUrl: 'message.card.html',
    selector: 'message-card',
})
export class MessageCard {
    @Input() message: any;
    @Output() removed: EventEmitter<any> = new EventEmitter();

    expanded: boolean;

    /**
     * Triggers remove
     */
    remove(event: MouseEvent) {
        this.removed.emit();
        event.stopPropagation();
    }
}
