import { Component, Input } from '@angular/core';
import { Item } from 'ionic-angular';

@Component({
    templateUrl: 'invoice.item.html',
    selector: 'invoice-item',
})
export class InvoiceItem extends Item {
    @Input() invoice: any;
}
