import { Component, Input } from '@angular/core';
import { Item } from 'ionic-angular';

@Component({
    templateUrl: 'tender.item.html',
    selector: 'tender-item',
})
export class TenderItem extends Item {
    @Input() tender: any;
}
