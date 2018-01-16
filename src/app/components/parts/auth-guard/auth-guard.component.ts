import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Auth } from '../../../services/auth-service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
    selector: 'app-auth-guard',
    templateUrl: './auth-guard.component.html',
    styleUrls: ['./auth-guard.component.css']
})
export class AuthGuardComponent implements OnInit {

    constructor(public auth: Auth,
                public dialog: MatDialog) {
    }

    ngOnInit() {
    }


    openSignUpDialog() {
        this.dialog.open(
            SignUpComponent,
            {}
        );
    }

}
