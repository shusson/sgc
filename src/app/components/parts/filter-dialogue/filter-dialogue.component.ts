import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DimensionFilter } from '../../../services/mapd-filter.service';

@Component({
    selector: 'app-filter-dialogue',
    templateUrl: './filter-dialogue.component.html',
    styleUrls: ['./filter-dialogue.component.css']
})
export class FilterDialogueComponent {
    filter = new DimensionFilter();

    constructor(public dialogRef: MatDialogRef<FilterDialogueComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    operators() {
        if (!this.filter.dimension) {
            return [];
        } else if (this.filter.dimension.type === "STR") {
            return this.data.mfs.stringOperators();
        } else {
            return this.data.mfs.numericOperators();
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addFilter() {
        if (this.filter.dimension.type !== "STR") {
            this.filter.value = Number(this.filter.value)
        }
        this.dialogRef.close(this.filter);
    }
}
