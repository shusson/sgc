import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';

let MIN_NAV_WIDTH = 1200;

@Component({
    selector: 'app-page-container',
    templateUrl: './page-container.component.html',
    styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent implements OnInit {
    @Input() showTitle = true;
    title = 'CAAS';
    smallTitle = 'CAAS';
    showHamburger = false;

    @HostListener('window:resize') windowResized() {
        this.showHamburger = window.innerWidth <= MIN_NAV_WIDTH;
    }

    constructor(private router: Router,
                private scrollService: ScrollService) {
        this.windowResized();
        this.router.events
            .filter((x, idx) => x instanceof NavigationEnd)
            .subscribe((event: any) => {
                window.scrollTo(0, 0);
                let anchor = new RegExp(/#/);
                if (!event.url.match(anchor)) {
                    this.scrollService.scrollToTop();
                }
            });
    }

    ngOnInit() {

    }

    updateScroll($event: any) {
        this.scrollService.scroll($event);
    }
}
