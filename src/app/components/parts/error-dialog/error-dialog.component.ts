import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

    constructor(public dialogRef: MdDialogRef<ErrorDialogComponent>,
                @Inject(MD_DIALOG_DATA) public error: string) {
    }

    ngOnInit() {
    }

}
