import { Injectable, Optional, Inject } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { constants } from '../app.constants';
import Auth0Lock from 'auth0-lock';

const options: any = {
    theme: {
        logo: constants.GONE_LOGO,
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
                @Inject('NULL_VALUE') @Optional() private tokenExpiredFn?: any,
                @Inject('NULL_VALUE') @Optional() private location?: any,
                @Inject('NULL_VALUE') @Optional() public lock?: any) {
        this.tokenExpiredFn = tokenExpiredFn ? tokenExpiredFn : tokenNotExpired;
        this.lock = lock ? lock : new Auth0Lock(environment.auth0ClientId, environment.auth0Domain, options);
        this.location = location ? location : window.location;

        this.lock.on('authenticated', (authResult: any) => {
            if (authResult.idToken && authResult.idToken !== 'undefined') {
                localStorage.setItem('id_token', authResult.idToken);
                window.setTimeout(() => {
                    this.router.navigateByUrl(decodeURIComponent(authResult.state));
                }, 100);
            }
        });

        this.lock.on('unrecoverable_error', (authResult: any) => {
            localStorage.removeItem('id_token');
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
        return this.tokenExpiredFn();
    };

    public logout() {
        localStorage.removeItem('id_token');
        let f = document.createElement("iframe");
        f.style.display = "none";
        f.setAttribute("src", environment.jhubUrl + "/hub/logout");
        document.body.appendChild(f);
        this.location.href = `https://${ environment.auth0Domain }/v2/logout?returnTo=${ constants.ORIGIN_URL }`;
    };

}
