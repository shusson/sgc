import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { ChartsService } from '../../../services/charts.service';

@Component({
    selector: 'app-save-dialog',
    templateUrl: './save-dialog.component.html',
    styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit {
    tag = "";

    constructor(public dialogRef: MdDialogRef<SaveDialogComponent>,
                @Inject(MD_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    cancel() {
        this.dialogRef.close();
    }

    save() {
        this.data.cs.saveFilters(this.tag, this.data.sql);
        this.dialogRef.close();
    }

}

