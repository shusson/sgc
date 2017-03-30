import { Component, OnInit } from '@angular/core';
import { JHubService } from '../../../services/jhub-service';
import { Response } from '@angular/http';
import { Auth } from '../../../services/auth-service';
import { environment } from '../../../../environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
    jhubUrl: SafeUrl;
    constructor(private auth: Auth,
                private sanitizer: DomSanitizer) {
        if (!auth.authenticated()) {
            auth.lock.on('hide', () => {
                window.history.back();
            });
            auth.login();
        } else {
            this.jhubUrl = sanitizer.bypassSecurityTrustResourceUrl(environment.jhubUrl);
        }

    }

    ngOnInit() {

    }

}
