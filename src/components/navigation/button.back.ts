import { Component, Input } from '@angular/core';

/**
 * @name
 * ButtonBack
 * @description
 * Component for rendering back button
 *
 * @param label for translation
 *
 * @usage
 * ```html
 * <button-back label="some.label.to.translate"></button-back>
 * ```
 */
@Component({
    selector: 'button-back',
    templateUrl: 'button.back.html',
})
export class ButtonBack {
    @Input('label') label: string;
}
