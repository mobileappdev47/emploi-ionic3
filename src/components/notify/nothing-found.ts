import { Component, Input } from '@angular/core';

/**
 * @name
 * NothingFoundComponent
 *
 * @description
 * Component for nothing found information
 *
 * @param context Translation context - headline, message and button will be used (e.g. some.identifier.prefix.headline, etc)
 * @param values Interpolation values for translation (optional)
 * @param redirect Target tab for redirection (@see tabSwitch)
 *
 * @usage
 * ```html
 * <nothing-found context="some.identifier.prefix" values="{some: 'value'}" redirect="some-tab-name"></nothing-found>
 * ```
 *
 * @note Sets 'has-values' class to element if values is set
 */
@Component({
    selector: 'nothing-found',
    templateUrl: 'nothing-found.html'
})
export class NothingFoundComponent {
    @Input() context: string;
    @Input() values?: any;
    @Input() icon?: string;
    @Input() redirect: string;
}
