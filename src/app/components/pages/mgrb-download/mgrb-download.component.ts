import { Component, OnInit } from '@angular/core';
import { DurlService } from '../../../services/durl.service';
import { Auth } from '../../../services/auth-service';
import { LocalStorageService } from '../../../services/local-storage.service';

const MGRB_URL_CACHE_KEY = 'MGRB_URL_CACHE_KEY';
const MGRB_URL_EXPIRY_KEY = 'MGRB_URL_EXPIRY_KEY';
const MGRB_URL_EXPIRY = 10000;

@Component({
    selector: 'app-mgrb-download',
    templateUrl: './mgrb-download.component.html',
    styleUrls: ['./mgrb-download.component.css']
})
export class MgrbDownloadComponent implements OnInit {
    error = '';
    url = '';

    constructor(public durl: DurlService,
                public auth: Auth,
                public ls: LocalStorageService) {
    }

    // when 'window.location.href = url' is set some browsers will
    // reload the original source, so we need to prevent a cycle from happening.
    // A short cache is set up to only set the href once within the expiry time.
    ngOnInit() {
        if (!this.auth.authenticated()) {
            this.auth.login();
        } else {
            let cachedUrl = this.ls.getItem(MGRB_URL_CACHE_KEY);
            if (this.isValid(cachedUrl)) {
                this.url = cachedUrl;
            } else {
                this.durl.getDownloadUrl().subscribe((url) => {
                    this.url = url;
                    window.location.href = url;
                    this.setCache(url);
                }, (e) => {
                    this.error = e;
                });

            }
        }
    }

    isValid(cachedUrl) {
        let cachedExpiry = this.ls.getItem(MGRB_URL_EXPIRY_KEY);
        let expiryTime = JSON.parse(cachedExpiry);
        return cachedUrl && cachedExpiry && expiryTime > Date.now();
    }

    setCache(url) {
        this.ls.setItem(MGRB_URL_CACHE_KEY, url);
        this.ls.setItem(MGRB_URL_EXPIRY_KEY, JSON.stringify(Date.now() + MGRB_URL_EXPIRY));
    }

    reload() {
        window.location.reload(true);
    }

    login() {
        this.auth.login();
    }

    signUp() {
        this.auth.signUp();
    }

}
