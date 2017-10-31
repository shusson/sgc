import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Filter } from '../../../services/mapd-filter.service';

@Component({
    selector: 'app-filter-dialogue',
    templateUrl: './filter-dialogue.component.html',
    styleUrls: ['./filter-dialogue.component.css']
})
export class FilterDialogueComponent {
    filter = new Filter();

    constructor(public dialogRef: MatDialogRef<FilterDialogueComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    operators() {
        if (!this.filter.column) {
            return [];
        } else if (this.filter.column.type === "STR") {
            return this.data.mfs.stringOperators();
        } else {
            return this.data.mfs.numericOperators();
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addFilter() {
        this.dialogRef.close(this.filter);
    }
}
