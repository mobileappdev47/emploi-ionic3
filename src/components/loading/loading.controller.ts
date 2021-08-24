import { Injectable, ElementRef, Renderer2 } from '@angular/core';
import { LoadingController as IonicLoadingController, Loading, Refresher } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * @name LoadingController
 * @description
 * A LoadingController is a wrapper for ionic LoadingController getting text identifier to translate and flag to auto dismiss on page change
 * Dismisses on page change.
 *
 * @usage
 * ```ts
 * import { LoadingController } from '../components/loading';
 *
 * constructor(private loading: LoadingController) {
 *     let loading = this.loading.create('some.translation.identifier', false);
 *     ...then(() => {
 *         this.loading.hide(loading); // or
 *         loading.dismiss();          // but this can throw an error of ionic framework; @see /ionic-team/ionic/issues/11776
 *     });
 *     // can be used to programatically dismiss all loaders (if not done automatically)
 *     loading.clear();
 * }
 * ```
 *
 * Contains helper for programmatic refresher show (need to pass Renderer2)
 *
 * ```html
 * <ion-refresher (ionRefresh)="doRefresh($event);" #refresher>
 * ```ts
 * // ...
 * @ViewChild('refresher') refresher: any;
 * // ...
 * doRefresh(this.loading.refresher(this.renderer, this.refresher));
 *
 */
@Injectable()
export class LoadingController {

    private loaders: Loading[] = [];

    constructor(private translate: TranslateService, private base: IonicLoadingController) {
    }

    create(text: string, dismiss: boolean = true): Loading {
        const loader: Loading = this.base.create({
            content: this.translate.instant(text),
            dismissOnPageChange: dismiss,
        });
        // keep loaders in local collection (remove on dismiss)
        this.loaders.push(loader);
        loader.onDidDismiss(() => this.loaders.splice(this.loaders.indexOf(loader, 1)));
        return loader;
    }

    hide(instance: Loading, delay: number = 0) {
        setTimeout(() => {
            instance.dismiss().catch(() => {
                console.log('dismiss caught'); // tslint:disable-line no-console
            });
        }, delay);
    }

    /**
     * Simulates refresher opened programatically - until https://github.com/ionic-team/ionic/issues/10267
     */
    showRefresher(renderer: Renderer2, element: ElementRef): Refresher {
        // return if no refresher element given
        if (!element) {
            return;
        }
        // process otherwise
        const container = element.nativeElement;
        const content = container.previousSibling;
        renderer.addClass(container, 'refresher-active');
        renderer.setAttribute(container.children[0], 'state', 'refreshing');
        renderer.setStyle(content, 'transform', 'translateY(70px)');
        return {
            complete: () => {
                renderer.removeClass(container, 'refresher-active');
                renderer.setAttribute(container.children[0], 'state', 'inactive');
                renderer.setStyle(content, 'transform', 'translateY(0)');
            }
        } as Refresher;
    }

    clear() {
        // use any of local collection to dismiss all
        if (this.loaders[0]) {
            this.loaders[0].dismissAll();
        }
    }
}
