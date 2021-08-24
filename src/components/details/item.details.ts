import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { Config } from 'ionic-angular';

/**
 * Items details content toggle
 *
 * @usage
 * ```html
 * <ion-item>
 *   <h2>Some label</h2>
 *   <div itemDetails>
 *     Some details
 *   </div>
 * </ion-item>
 * ```
 */
@Directive({
    selector: '[itemDetails]'
})
export class ItemDetails implements AfterViewInit {

    private mode: string;
    private element: Element;
    private item: Element;
    private label: Element;
    private icon: Element;
    private opened: boolean = false;

    constructor(private config: Config, private ref: ElementRef) {
        this.element = this.ref.nativeElement;
        this.mode = this.config.get('mode');
    }

    @HostListener('document:click', ['$event.target'])
    onClick(target: Element) {
        if (this.label === target || this.label.contains(target) || this.icon === target) {
            this.toggle();
        }
    }

    ngAfterViewInit() {
        this.item = this.element.parentElement;
        this.label = this.element.previousElementSibling || this.element;
        this.item.classList.add('has-item-details');
        this.createIcon();
    }

    private createIcon() {
        this.icon = document.createElement('ion-icon');
        this.icon.className = `icon icon-${this.mode} ion-${this.mode}-arrow-dropright item-icon`;
        this.item.insertBefore(this.icon, this.element);
    }

    private toggle() {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    private open() {
        this.item.classList.add('details-opening');
        setTimeout(() => this.item.classList.add('details-opened'), 300);
        this.opened = true;
    }

    private close() {
        this.item.classList.remove('details-opened');
        setTimeout(() => this.item.classList.remove('details-opening'), 25);
        this.opened = false;
    }
}
