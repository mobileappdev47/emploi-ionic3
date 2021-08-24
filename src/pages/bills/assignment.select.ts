import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

import { Checklist as checklist } from '../../utils/checklist';

/**
 * @name
 * AssignmentSelect
 *
 * @description
 * Check-box component for assignment selection.
 * Directive renders list of assignments containing selectable items. Each item can be checked/unchecked
 * and enabled/disabled depending on `assignment` (property `disabled` basing on some conditions)
 *
 * @param assignments List of available assignments
 * @param selected Selected assignments ids
 * @param action Optional action handler as object within methods info, handler, enabled - all getting assignment
 *
 * @usage
 * ```html
 * <assignment-select [assignments]="assignments" [(selected)]="some.selected" [action]="actions"></assignment-select>
 * ```
 *
 */

export interface IAssignmentSelectButton {
    label?: string;
    info?: (assignment: any) => string;
    handler?: (assignment: any) => Promise<any>;
    enabled?: (assignment: any) => boolean;
}

@Component({
    selector: 'assignment-select',
    templateUrl: 'assignment.select.html',
})
export class AssignmentSelect implements OnInit, OnChanges {
    @Input() assignments: any[];
    @Input() selected: number[];
    @Input('disabled') disable: boolean;
    @Input() action: IAssignmentSelectButton;
    @Output() selectedChange = new EventEmitter();

    chosen: any;
    disabled: any = {};

    ngOnInit() {
        this.assignments = this.assignments || [];
        // prepare checklist model
        this.chosen = checklist.prepare(this.assignments);
        (this.selected || []).map((id) => this.chosen[id] = true);
    }

    ngOnChanges(changes: { disable: any }) {
        if (changes.disable) {
            this.updateDisabled();
        }
    }

    onToggle() {
        this.selected = checklist.selected(this.chosen).map(Number);
        this.selectedChange.emit(this.selected);
    }

    updateDisabled() {
        const disabled: { [key: number]: boolean } = {};
        this.assignments.forEach((assignment: { id: number, disabled: boolean }) => {
            if (assignment.disabled || this.disable) {
                disabled[assignment.id] = true;
            }
        });
        this.disabled = disabled;
    }
}
