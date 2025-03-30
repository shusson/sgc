import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Auth } from '../../../services/auth-service';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
    selector: 'app-header-nav',
    templateUrl: './header-nav.component.html',
    styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
    termsDropdown = false;
    userDropdown = false;
    termsLinkActive = false;
    userEmail = localStorage.getItem('uid')?localStorage.getItem('uid'):null;

    @HostListener('document:click', ['$event']) outsideClick($event: Event) {
        if (!$event) {
            return;
        }
        if (!this.elf.nativeElement.contains($event.target)) {
            this.hideTerms();
            this.hideUser();
        }
    }

    constructor(public auth: Auth,
                private router: Router,
                private elf: ElementRef,
                private scrollService: ScrollService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        this.router.events
            .filter((x, idx) => x instanceof NavigationEnd)
            .subscribe((event: any) => {
                this.termsLinkActive = event.url.match(new RegExp(/^\/terms/, 'i'));
            });

        this.scrollService.scrolled.subscribe(this.hideTerms);

    }

    toggleTerms(event: Event) {
        event.stopPropagation();
        this.termsDropdown ? this.hideTerms() : this.showTerms();
    }

    hideTerms = () => {
        if (this.termsDropdown) {
            this.termsDropdown = false;
        }
    };

    showTerms = () => {
        if (!this.termsDropdown) {
            this.termsDropdown = true;
            this.userDropdown = false;
        }
    };

    toggleUser(event: Event) {
        event.stopPropagation();
        this.userDropdown ? this.hideUser() : this.showUser();
    }

    hideUser = () => {
        if (this.userDropdown) {
            this.userDropdown = false;
        }
    };

    showUser = () => {
        if (!this.userDropdown) {
            this.userDropdown = true;
            this.termsDropdown = false;
        }
    };

    goToMgrbTerms(event: Event) {
        event.stopPropagation();
        this.router.navigate(['/terms/mgrb']);
    }

    openSignUpDialog() {
        this.dialog.open(
            SignUpComponent,
            {}
        );
    }

}
