import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

const MAIN_SCROLL_ID = 'main-scroll';
const SCROLL_DELAY = 300;

@Injectable()
export class ScrollService {
    currentScrollTop = 0;
    scrolled = new Subject<Boolean>();
    private timerId: number = null;

    constructor() {
        this.scrolled.subscribe((event: any) => {
            if (event) {
                this.currentScrollTop = event.target.scrollTop;
            }
        });
    }

    scroll(event: any) {
        if (this.timerId !== null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
        this.scrolled.next(event);
        this.timerId = window.setTimeout(() => {
            this.scrolled.next(false);
            this.timerId = null;
        }, SCROLL_DELAY);
    }

    scrollToTop() {
        document.getElementById(MAIN_SCROLL_ID).scrollTop = 0;
    }
}
