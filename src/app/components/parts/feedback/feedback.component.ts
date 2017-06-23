import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth-service';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
    constructor(public dialogRef: MdDialogRef<FeedbackComponent>,
                private auth: Auth) {
    }

    ngOnInit() {
        Canny('render', {
            boardToken: 'e49f9b2e-d376-bd3f-b62e-ee24358c4354',
            basePath: 'explore',
            ssoToken: this.auth.cannyToken(),
        });
    }
}
