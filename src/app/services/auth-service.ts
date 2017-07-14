import { Injectable, Optional, Inject } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { constants } from '../app.constants';
import Auth0Lock from 'auth0-lock';
import { MdDialog } from '@angular/material';
import { ErrorDialogComponent } from '../components/parts/error-dialog/error-dialog.component';

const authKey = 'id_token';
const cannyKey = 'canny_token';

const options: any = {
    theme: {
        logo: constants.GARVAN_KCCG_LOGO,
        primaryColor: constants.PRIMARY_COLOR,
    },
    languageDictionary: {
        title: ''
    },
    auth: {
        redirectUrl: constants.ORIGIN_URL + 'initiatives',
        responseType: 'id_token token'
    },
    avatar: null
};

@Injectable()
export class Auth {

    constructor(private router: Router,
                public dialog: MdDialog,
                @Inject('NULL_VALUE') @Optional() private tokenExpiredFn?: any,
                @Inject('NULL_VALUE') @Optional() private location?: any,
                @Inject('NULL_VALUE') @Optional() public lock?: any) {
        this.tokenExpiredFn = tokenExpiredFn ? tokenExpiredFn : tokenNotExpired;
        this.lock = lock ? lock : new Auth0Lock(environment.auth0ClientId, environment.auth0Domain, options);
        this.location = location ? location : window.location;

        this.lock.on('authenticated', (authResult: any) => {
            try {
                if (authResult.idToken && authResult.idToken !== 'undefined') {
                    localStorage.setItem(authKey, authResult.idToken);
                    localStorage.setItem(cannyKey, authResult.idTokenPayload['http://sgc/cannyToken']);
                    window.setTimeout(() => {
                        this.router.navigateByUrl(decodeURIComponent(authResult.state));
                    }, 100);
                }
            } catch (e) {
                window.setTimeout(() => {
                    this.dialog.open(
                        ErrorDialogComponent,
                        { data: "An error occurred while trying to authenticate. Please ensure private browsing is disabled and try again."}
                    );
                }, 100);
            }
        });

        this.lock.on('unrecoverable_error', (authResult: any) => {
            localStorage.removeItem(authKey);
            localStorage.removeItem(cannyKey);
        });

    }

    public login() {
        this.lock.show({
            auth: {
                params: {
                    state: this.router.url,
                    scope: 'openid email'
                },
            },
            initialScreen: 'login'
        });
    };

    public signUp() {
        this.lock.show({
            auth: {
                params: {
                    state: this.router.url,
                    scope: 'openid email'
                },
            },
            initialScreen: 'signUp'
        });
    }

    public authenticated() {
        return this.tokenExpiredFn(authKey);
    };

    public logout() {
        localStorage.removeItem(authKey);
        localStorage.removeItem(cannyKey);
        this.location.href = `https://${ environment.auth0Domain }/v2/logout?returnTo=${ constants.ORIGIN_URL }`;
    };

    cannyToken(): string {
        return localStorage.getItem(cannyKey);
    }
}
