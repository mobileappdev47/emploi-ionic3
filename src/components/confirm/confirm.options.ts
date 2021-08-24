/**
 * Options for ConfirmController
 *
 * @param {string} context Optional context for translations - will be used as [context].title/message and [context].buttons.[cancel|confirm]
 * @param {string} title Optional title*
 * @param {string} message Optional message*
 * @param {string} item Optional item to use for translation interpolation
 * @param {boolean} persistant Optional switch to make modal fixed - not buttons, no dismissable
 * @param {string|boolean} cancel Optional cancel button (string will be used as buttons.identifier); button will be shown if onCancel is set
 * @param {function} onCancel Optional cancel action handler
 * @param {string|boolean} confirm Optional cancel button (string will be used as buttons.identifier); button will be shown if onConfirm is set
 * @param {function} onConfirm Optional cancel action handler
 * @param {string} cssClass CSS class
 *
 * *will not translate if given translated (assuming whitespaces means translated)
 */
export interface IConfirmOptions {
    context?: string;
    title?: string;
    message?: string;
    item?: any;
    persistant?: boolean;
    cancel?: string | boolean;
    onCancel?: () => void;
    confirm?: string | boolean;
    onConfirm?: () => void;
    cssClass?: string;
    buttonCssClass?: string;
}
