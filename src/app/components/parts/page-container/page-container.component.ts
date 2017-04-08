import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';
import { Subscription } from 'rxjs/Subscription';

let MIN_NAV_WIDTH = 1200;

@Component({
    selector: 'app-page-container',
    templateUrl: './page-container.component.html',
    styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent implements OnInit, OnDestroy {
    @Input() showTitle = true;
    title = 'CAAS';
    smallTitle = 'CAAS';
    showHamburger = false;
    private subs: Subscription[] = [];

    @HostListener('window:resize') windowResized() {
        this.showHamburger = window.innerWidth <= MIN_NAV_WIDTH;
    }

    constructor(private router: Router,
                private scrollService: ScrollService) {
        this.windowResized();
        this.subs.push(this.router.events
            .filter((x, idx) => x instanceof NavigationEnd)
            .subscribe((event: any) => {
                window.scrollTo(0, 0);
                let anchor = new RegExp(/#/);
                if (!event.url.match(anchor)) {
                    this.scrollService.scrollToTop();
                }
            }));
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }

    updateScroll($event: any) {
        this.scrollService.scroll($event);
    }
}
