import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth-service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
    termsDropdown = false;
    termsLinkActive = false;

    constructor(public auth: Auth,
                private router: Router) {
    }

    ngOnInit() {
        this.router.events
            .filter((x, idx) => x instanceof NavigationEnd)
            .subscribe((event: any) => {
                this.termsLinkActive = event.url.match(new RegExp(/^\/terms/, 'i'));
            });
    }

    toggleTerms(event: Event) {
        event.stopPropagation();
        this.termsDropdown = this.termsDropdown ? false : true;
    }

    goToMgrbTerms(event: Event) {
        this.termsDropdown = false;
        this.router.navigate(['/terms/mgrb']);
    }

}
