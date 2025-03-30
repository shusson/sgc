import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { constants } from '../app.constants';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../components/parts/error-dialog/error-dialog.component';
import * as jwtDecode from 'jwt-decode';
import * as auth0 from 'auth0-js';

export const expiredAtKey = 'expired_at';
export const uidKey = 'uid';
export const urlStateKey = 'urlState';

@Injectable()
export class Auth {


    auth0 = new auth0.WebAuth({
        clientID: environment.auth0ClientId,
        domain: environment.auth0Domain,
        responseType: 'token id_token',
        audience: 'https://sgc.au.auth0.com/userinfo',
        redirectUri: `${constants.ORIGIN_URL}/auth`,
        scope: 'openid email'
    });

    constructor(private router: Router,
                public dialog: MatDialog) {
    }

    public handleAuthentication(): void {
        this.auth0.parseHash(this.handleAuthResult);
    }

    public login() {
        localStorage.setItem(urlStateKey, location.pathname);
        this.auth0.authorize();
    };

    public signUp(email, password, cb) {
        this.auth0.signupAndAuthorize({
            email: email,
            password: password,
            connection: environment.auth0Connection
        }, cb);
    }

    public authenticated() {
        const exp = localStorage.getItem(expiredAtKey);
        if (!exp) {
            return false;
        }
        const expiresAt = JSON.parse(localStorage.getItem(expiredAtKey));
        return new Date().getTime() < expiresAt;
    };

    public logout() {
        this.clearLocalStorage();
        window.location.href = `https://${ environment.auth0Domain }/v2/logout?returnTo=${ constants.ORIGIN_URL }`;
    };

    public setSession(authResult): void {
        const idToken = jwtDecode(authResult.idToken);
        localStorage.setItem(uidKey, idToken.email);
        const expiresAt = JSON.stringify(idToken.exp * 1000);
        localStorage.setItem(expiredAtKey, expiresAt);
    }

    private handleAuthResult = (err, authResult) => {
        if (err) {
            if (!environment.production) {
                console.log(err);
            }
            if(err.errorDescription === "Please verify your email before logging in."){
                this.dialog.open(
                    ErrorDialogComponent,
                    { data: "Please verify your email before logging in."}
                );
                this.router.navigate(['/initiatives'])
            }else{
                this.dialog.open(
                    ErrorDialogComponent,
                    { data: "An error occurred while trying to authenticate. Please ensure private browsing is disabled and try again."}
                );
                this.router.navigate(['/initiatives'])
            }
        } else if (authResult && authResult.idToken && authResult.idToken !== 'undefined') {
            this.setSession(authResult);
            const path = localStorage.getItem(urlStateKey);
            this.router.navigateByUrl(path);
        }
    };

    clearLocalStorage() {
        localStorage.removeItem(expiredAtKey);
        localStorage.removeItem(uidKey);
        localStorage.removeItem(urlStateKey);
    }
}
