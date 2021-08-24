import { Component, Input, OnChanges, OnDestroy, AfterViewInit, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

/**
 * Helper component to validate conditions, displaying errors on submit click try; sets button disable styled.
 *
 * @param context Translation namespace [context].errors.[field] will be used for error messages
 * @param check Check object definition - will evaluate if (strictly) false to display error
 * @param form Optional form reference if 'validity' check is defined - will check and display validation rules on form controls
 *     Will use [context].errors.[field].[rule] for translation
 *
 * @example
 *
 * <form #form="ngForm">
 *   <!-- form elements -->
 *   <submit-validator context="some.context" [form]="form" [check]="{
 *     validity: form.value,
 *     some: someValue === 'custom-value' ? checkCondition > 0 : undefined
 *   }">
 *   </submit-validator>
 *   <button ...></button>
 *
 *   @note Button must be next sibling; button type is changed to button/submit accordingly
 */

@Component({
    selector: 'submit-validator',
    template: '<div *ngFor="let err of errors">{{ err }}</div>',
})
export class SubmitValidator implements OnChanges, AfterViewInit, OnDestroy {
    @HostBinding('class.submitting') submitting: boolean = false;
    @Input() context: string;
    @Input() check: any;
    @Input() form?: NgForm;

    button: HTMLButtonElement;
    errors: string[] = [];
    clickListener: any = {
        handleEvent: (e: Event) => this.onButtonClick(e),
    };

    constructor(private translate: TranslateService, private element: ElementRef, private renderer: Renderer2) {
    }

    ngAfterViewInit() {
        this.button = this.element.nativeElement.nextElementSibling;
        if (this.button && this.button.tagName === 'BUTTON') {
            this.button.addEventListener('click', this.clickListener);
            this.ngOnChanges();
        }
    }

    ngOnChanges() {
        // from check
        const checked = Object.keys(this.check)
            .map((key) => key !== 'validity' && this.check[key] === false && this.translate.instant(`${this.context}.errors.${key}`))
            .filter(Boolean);
        // and from form validators
        const controled = Object.keys(this.form && this.check.validity !== undefined && this.form.controls || {})
            .map((key) => this.form.controls[key].invalid === true &&
                this.translate.instant(`${this.context}.errors.${key}.` + Object.keys(this.form.controls[key].errors).shift()))
            .filter(Boolean);
        // concated
        this.errors = controled.concat(checked);

        // then set button class (incl. type to handle click as submit if valid)
        if (this.button) {
            if (this.errors.length > 0) {
                this.renderer.addClass(this.button, 'disabled');
                this.button.type = 'button';
            } else {
                this.renderer.removeClass(this.button, 'disabled');
                this.button.type = 'submit';
            }
        }
    }

    onButtonClick(event: Event) {
        this.submitting = true;

        if (this.errors.length) {
            event.preventDefault();
        }
    }

    ngOnDestroy() {
        if (this.button) {
            this.renderer.removeClass(this.button, 'disabled');
            this.button.removeEventListener('click', this.clickListener);
        }
    }
}
