import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';

@Component({
    selector: 'app-snackbar-demo',
    templateUrl: './snackbar-demo.component.html',
    styleUrls: ['./snackbar-demo.component.css']
})
export class SnackbarDemoComponent implements OnInit {
    query: any;

    constructor(private sb: MdSnackBar) {
    }

    ngOnInit() {
    }

    exitDemo() {
        this.sb.dismiss();
    }

}
