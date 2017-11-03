import {
    Component, OnInit, Input, HostListener, ElementRef, Output, EventEmitter, OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SearchBarService } from '../../../services/search-bar-service';
import { AutocompleteResult } from '../../../model/autocomplete-result';

export class SearchBarOptions {
    autofocus = false;
    mobile = false;
}

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
    @Input() options = new SearchBarOptions();
    @Input() placeholder = 'Search genes or regions, e.g BRCA1 or 17:41322498-41363708';
    @Input() action;
    @Output() focused = new EventEmitter();
    loading = false;
    selectedIndex = 0;
    autocompleteResults: AutocompleteResult<any>[] = [];
    private searchResults: Observable<AutocompleteResult<any>[]>;
    private searchTerms: Subject<string> = new Subject<string>();
    private subscriptions: Subscription[] = [];

    @HostListener('document:click', ['$event']) outsideClick($event: Event) {
        if (!$event) {
            return;
        }
        if (!this.elf.nativeElement.contains($event.target)) {
            this.autocompleteResults = [];
        }
    }

    constructor(public searchBarService: SearchBarService,
                private elf: ElementRef,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.searchResults = this.searchTerms
            .debounceTime(300)
            .switchMap(term => {
                if (term && term.length > 1) {
                    return this.searchBarService.searchAutocompleteServicesStartsWith(term);
                } else {
                    return Observable.of<any[]>([]);
                }
            })
            .catch(error => {
                this.handleError(error);
                return Observable.of<any[]>([]);
            })
            .share();

        this.subscriptions.push(this.searchResults.subscribe((results: AutocompleteResult<any>[]) => {
            this.selectedIndex = 0;
            this.autocompleteResults = results;
            this.loading = false;
            this.cd.detectChanges();
        }));
    }

    onKeyDown(event: KeyboardEvent, searchBox: HTMLInputElement) {
        if (event.code === 'ArrowUp' && this.selectedIndex > 0) {
            event.preventDefault();
            this.selectedIndex--;
        } else if (event.code === 'ArrowDown' && this.selectedIndex < this.autocompleteResults.length - 1) {
            event.preventDefault();
            this.selectedIndex++;
        } else if (event.code === 'Enter' && this.autocompleteResults.length > 0) {
            this.search(event, searchBox, this.autocompleteResults[this.selectedIndex]);
        } else if (event.code === 'Enter') {
            this.searchTerms.next(''); // clear any pending results
            this.action(searchBox.value);
        }
    }

    highlightAutocompleteResult(index: number) {
        this.selectedIndex = index;
    }

    searchAutocomplete(query: string) {
        this.loading = true;
        this.searchBarService.autocompleteError = '';
        this.searchTerms.next(query);
    }

    search(event: Event, searchBox: HTMLInputElement, result: AutocompleteResult<any>) {
        event.stopPropagation();
        event.preventDefault();
        searchBox.blur();
        this.searchTerms.next(''); // clear any pending results
        this.action(result.displayName());
    }

    private handleError = (error: any): void => {
        this.searchBarService.autocompleteError = error;
        this.loading = false;
    }

    onFocused(query: string) {
        this.focused.emit(query);
    }

    onBlur() {
        this.autocompleteResults = [];
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
