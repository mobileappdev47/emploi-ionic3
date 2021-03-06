/* tslint:disable */

import { trigger, transition, style, animate } from '@angular/animations';

export const animations = [
    trigger('softItem', [
        transition(':enter', [
            style({opacity: 0}),
            animate('300ms', style({opacity: 1}))
        ]),
        transition(':leave', [
            style({opacity: 1}),
            animate('200ms', style({opacity: 0})),
            animate('100ms', style({height: 0}))
        ])
    ])
];
