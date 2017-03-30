import { Component, Input, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar-service';
import { ScrollService } from '../../../services/scroll-service';

@Component({
    selector: 'app-search-bar-with-options',
    templateUrl: './search-bar-with-options.component.html',
    styleUrls: ['./search-bar-with-options.component.css']
})
export class SearchBarWithOptionsComponent implements AfterViewInit {
    @Input() expanded = false;
    @Input() expandable = false;

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
        this.searchBarService.searchedEvent.subscribe(() => {
            this.expanded = false;
        });
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

}
