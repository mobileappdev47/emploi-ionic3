import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

/**
 * Directive for counting down given time.
 *
 * @param time Time in seconds
 * @param label Translate identifier
 *
 * @example
 * <countdown-time [time]="some.time" label="some.label"></countdown-time>
 */
@Component({
    selector: 'countdown-timer',
    template: `{{ label | translate }} {{ counter | async }} {{ 'common.seconds' | translate }}`,
})
export class CountownTimer implements OnInit {

    @Input() time: number;
    @Input() label?: string = 'common.countdown';

    counter: Observable<number>;

    ngOnInit() {
        this.counter = Observable.timer(0, 1000)
            .take(this.time + 1)
            .map(() => this.time--);
    }
}
