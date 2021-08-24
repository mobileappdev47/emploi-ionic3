import { Directive, ElementRef, Renderer, Input, SimpleChange, HostBinding } from '@angular/core';
import { OnChanges, OnDestroy, Injector } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { FilesService, IPictureObject } from '../files';

/**
 * @name
 * PictureLoadDirective
 *
 * @description
 * Directive for getting picture by api request.
 *
 * @param pictureLoad Picture id
 * @param PictureSize Optional picture size; medium default
 * @param PictureType Optional picture type; square default
 *
 * @note
 * Uses api service and expects getPicture({id: string}) method there
 *
 * @usage
 * ```html
 * <img [pictureLoad]="picture.id" pictureSize="medium" />
 * ```
 */
@Directive({
    selector: '[pictureLoad]',
})
export class PictureLoadDirective implements OnChanges, OnDestroy {
    @Input('pictureLoad') id: string;
    @Input('pictureSize') size: string = 'medium';
    @Input('pictureType') variant: string = 'squared';
    @HostBinding('src') imageUrl: SafeUrl = '';

    private picture: IPictureObject;
    private files: FilesService;

    constructor(private sanitizer: DomSanitizer, private injector: Injector, private ref: ElementRef, private renderer: Renderer) {
        this.renderer.setElementClass(this.ref.nativeElement, 'picture-load', true);
    }

    ngOnChanges(changes: { id: SimpleChange }) {
        if (!this.files) {
            this.files = this.injector.get(FilesService);
        }

        if (changes.id && changes.id.currentValue) {
            this.ngOnDestroy();
            this.files.fetchPicture(changes.id.currentValue, this.size, this.variant).then((picture: IPictureObject) => {
                this.picture = picture;
                this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(picture.url());
            });
        }
    }

    ngOnDestroy() {
        if (this.picture) {
            this.picture.revoke();
            this.picture = undefined;
        }
    }
}
