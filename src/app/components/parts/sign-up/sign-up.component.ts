import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { constants } from '../../../app.constants';
import { Auth, urlStateKey } from '../../../services/auth-service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    formData = {
        email: '',
        password: ''
    };
    error = '';
    success = false;
    loading = false;
    loginMessage = false;
    logo = constants.GARVAN_KCCG_LOGO;

    constructor(public auth: Auth,
                public dialogRef: MatDialogRef<ErrorDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data) {
    }

    ngOnInit() {
    }

    signUp() {
        this.loading = true;
        this.auth.signUp(this.formData.email, this.formData.password, this.handleSignUp);
    }

    private handleSignUp = (err, authResult) => {
        if (err) {
            if (!environment.production) {
                console.log(err);
            }
            if (err && err.code === 'user_exists') {
                this.error = "User already exists.";
                this.loginMessage = true;
            } else {
                this.error = "An unexpected error occurred. Please try again.";
            }
            this.loading = false;
        } else if (authResult && authResult.idToken && authResult.idToken !== 'undefined') {
            this.auth.setSession(authResult);
            this.loading = false;
            this.success = true;
            window.setTimeout(() => {
                this.dialogRef.close();
            }, 600);
        }
    };
}
