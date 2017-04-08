import { Component, OnInit, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { Auth } from '../../../services/auth-service';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-header-nav',
    templateUrl: './header-nav.component.html',
    styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit, OnDestroy {
    termsDropdown = false;
    termsLinkActive = false;
    private subs: Subscription[] = [];

    @HostListener('document:click', ['$event']) outsideClick($event: Event) {
        if (!$event) {
            return;
        }
        if (!this.elf.nativeElement.contains($event.target)) {
            this.hideTerms();
        }
    }

    constructor(public auth: Auth,
                private router: Router,
                private elf: ElementRef,
                private scrollService: ScrollService) {
    }

    ngOnInit() {
        this.subs.push(this.router.events
            .filter((x, idx) => x instanceof NavigationEnd)
            .subscribe((event: any) => {
                this.termsLinkActive = event.url.match(new RegExp(/^\/terms/, 'i'));
            }));

        this.subs.push(this.scrollService.scrolled.subscribe(this.hideTerms));

    }

    toggleTerms(event: Event) {
        event.stopPropagation();
        this.termsDropdown ? this.hideTerms() : this.showTerms();
    }

    hideTerms = () => {
        if (this.termsDropdown) {
            this.termsDropdown = false;
        }
    }

    showTerms = () => {
        if (!this.termsDropdown) {
            this.termsDropdown = true;
        }
    }

    goToMgrbTerms(event: Event) {
        event.stopPropagation();
        this.router.navigate(['/terms/mgrb']);
    }


    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }

}
