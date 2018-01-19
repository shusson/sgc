import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';
import { Subscription } from 'rxjs/Subscription';

const MIN_NAV_WIDTH = 1285;

@Component({
    selector: 'app-page-container',
    templateUrl: './page-container.component.html',
    styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent implements OnInit, OnDestroy {
    @Input() showTitle = true;
    @Input() showPrivacy = true;
    @Input() showBanner = false;
    title = 'DISCOVERY';
    smallTitle = 'DISCOVERY';
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
            .subscribe(() => {
                window.scrollTo(0, 0);
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
