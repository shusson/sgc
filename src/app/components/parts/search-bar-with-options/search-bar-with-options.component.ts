import { Component, Input, HostListener, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar-service';
import { ScrollService } from '../../../services/scroll-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-search-bar-with-options',
    templateUrl: './search-bar-with-options.component.html',
    styleUrls: ['./search-bar-with-options.component.css']
})
export class SearchBarWithOptionsComponent implements AfterViewInit, OnDestroy {
    @Input() expanded = false;
    @Input() expandable = false;
    @Input() example1 = 'FAM110C';
    @Input() example2 = '22:46546424-46639653';
    @Input() action = (query) => {
        this.searchBarService.query = query;
        const obj = {query: query, timestamp: Date.now()};
        this.router.navigate(['/search/results', obj]);
    };
    private subs: Subscription[] = [];

    @HostListener('document:click', ['$event']) onClick($event: Event) {
        this.toggleExpansion($event);
    }
    @HostListener('document:touch', ['$event']) onTouch($event: Event) {
        this.toggleExpansion($event);
    }
    @HostListener('document:touchstart', ['$event']) onTouchstart($event: Event) {
        this.toggleExpansion($event);
    }

    constructor(public elf: ElementRef,
                public router: Router,
                public searchBarService: SearchBarService) {
    }

    ngAfterViewInit(): void {
        this.subs.push(this.searchBarService.searchedEvent.subscribe(() => {
            this.expanded = false;
        }));
    }

    toggleExpansion($event: Event) {
        if (!$event) {
            return;
        }
        if (!this.elf.nativeElement.contains($event.target)) {
            if (this.expandable) {
                this.expanded = false;
            }
        }
    }

    onFocus() {
        if (this.expandable) {
            this.expanded = true;
        }
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }

}
