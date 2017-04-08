import { Component, Input, HostListener, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar-service';
import { ScrollService } from '../../../services/scroll-service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-search-bar-with-options',
    templateUrl: './search-bar-with-options.component.html',
    styleUrls: ['./search-bar-with-options.component.css']
})
export class SearchBarWithOptionsComponent implements AfterViewInit, OnDestroy {
    @Input() expanded = false;
    @Input() expandable = false;
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
