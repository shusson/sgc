import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GeneList } from '../../../services/autocomplete/gene-lists-service';

@Component({
    selector: 'app-add-gene-list-dialog',
    templateUrl: './add-gene-list-dialog.component.html',
    styleUrls: ['./add-gene-list-dialog.component.css']
})
export class AddGeneListDialogComponent {

    constructor(public dialogRef: MatDialogRef<AddGeneListDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    selectGeneList(l: GeneList) {
        this.dialogRef.close(l);
    }
}
