import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Auth } from '../../../services/auth-service';
import { Router, NavigationEnd } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
    termsDropdown = false;
    termsLinkActive = false;
    private subs: Subscription[] = [];

    constructor(public auth: Auth,
                private router: Router,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        this.subs.push(this.router.events
            .filter((x, idx) => x instanceof NavigationEnd)
            .subscribe((event: any) => {
                this.termsLinkActive = event.url.match(new RegExp(/^\/terms/, 'i'));
            }));
    }

    toggleTerms(event: Event) {
        event.stopPropagation();
        this.termsDropdown = !this.termsDropdown;
    }

    goToMgrbTerms(event: Event) {
        this.termsDropdown = false;
        this.router.navigate(['/terms/mgrb']);
    }

    openSignUpDialog() {
        this.dialog.open(
            SignUpComponent,
            {}
        );
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }

}
