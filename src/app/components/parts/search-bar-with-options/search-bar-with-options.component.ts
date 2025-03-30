import { Component, Input, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar-service';
import { ScrollService } from '../../../services/scroll-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-search-bar-with-options',
    templateUrl: './search-bar-with-options.component.html',
    styleUrls: ['./search-bar-with-options.component.css']
})
export class SearchBarWithOptionsComponent implements AfterViewInit {
    @Input() expanded = false;
    @Input() expandable = false;
    @Input() example1 = 'FAM110C';
    @Input() example2 = '22:46546424-46639653';
    @Input() action = (query) => {
        this.searchBarService.query = query;
        const obj = {query: query, timestamp: Date.now()};
        this.router.navigate(['/search/results', obj]);
    };
    private subscriptions: Subscription[] = [];
    regionError: boolean = false;

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
        this.searchBarService.searchedEvent.subscribe(() => {
            this.expanded = false;
        });

        this.subscriptions.push(this.searchBarService.startGreaterThanEnd.subscribe((flag) =>{
            this.regionError = flag;
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

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

}
