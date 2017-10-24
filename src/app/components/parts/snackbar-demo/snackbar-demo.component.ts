import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Component({
    selector: 'app-snackbar-demo',
    templateUrl: './snackbar-demo.component.html',
    styleUrls: ['./snackbar-demo.component.css']
})
export class SnackbarDemoComponent implements OnInit {
    query: any;

    constructor(private sb: MatSnackBar) {
    }

    ngOnInit() {
    }

    exitDemo() {
        this.sb.dismiss();
    }

}
