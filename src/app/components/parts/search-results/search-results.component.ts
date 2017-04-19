import { Component, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Variant } from '../../../model/variant';

import { VariantSearchService } from '../../../services/variant-search-service';
import { Subscription } from 'rxjs';
import { VariantTrackService} from '../../../services/genome-browser/variant-track-service';
import { SearchBarService } from '../../../services/search-bar-service';
import { AutocompleteResult } from '../../../model/autocomplete-result';
import { Gene } from '../../../model/gene';
import { Region } from '../../../model/region';
import { SearchFilterService } from '../../../services/search-filter.service';
import { SearchFilterItem, SearchFilterItemSerialised } from '../../../model/search-filter-item';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css'],
    providers: [VariantSearchService, VariantTrackService, SearchFilterService]
})
export class SearchResultsComponent implements OnInit, OnDestroy {
    @Input() autocomplete: AutocompleteResult<any>;
    @Output() errorEvent = new EventEmitter();
    variants: Variant[] = [];
    loadingVariants = false;
    loadGb = true;
    private subscriptions: Subscription[] = [];

    constructor(public searchService: VariantSearchService,
                private cd: ChangeDetectorRef,
                private searchBarService: SearchBarService,
                private sfs: SearchFilterService) {
    }

    ngOnInit(): void {
        this.variants = this.searchService.variants;
        this.subscriptions.push(this.searchService.results.subscribe(v => {
            this.variants = v.variants;
            this.cd.detectChanges();
        }));

        this.subscriptions.push(this.searchService.errors.subscribe((e) => {
            this.errorEvent.emit(e);
        }));

        this.subscriptions.push(this.sfs.updates.debounceTime(500).subscribe(() => {
            let q = this.searchService.lastQuery;
            let previous = this.searchService.lastQuery.clinicalFilters;
            let validFilters: SearchFilterItem[] = this.sfs.appliedItems.filter((f) => f.isValid() && f.enabled);

            let newFilters = [];
            validFilters.forEach((cf) => {
                let existing = previous.find((ocf: SearchFilterItemSerialised) => cf.isEqual(ocf));
                if (!existing) {
                    newFilters.push(cf);
                }
            });

            let deletedFilters = [];
            previous.forEach((ocf: SearchFilterItemSerialised) => {
                let existing = validFilters.find((cf) => cf.isEqual(ocf));
                if (!existing) {
                    deletedFilters.push(ocf);
                }
            });

            if (newFilters.length > 0 || deletedFilters.length > 0) {
                q.clinicalFilters = <SearchFilterItemSerialised[]>(validFilters);
                this.loadGb = false;
                this.searchService.getVariants(q).then(() => {
                    this.loadGb = true;
                    this.cd.detectChanges();
                });
            }
        }));

        this.loadingVariants = true;
        this.autocomplete.search(this.searchService, this.searchBarService.options, [])
            .then(() => {
                this.loadingVariants = false;
            })
            .catch((e) => {
                this.loadingVariants = false;
                this.errorEvent.emit(e);
            });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    showGeneInformation() {
        return !this.searchService.hasMoved() && this.autocomplete.result instanceof Gene;
    }

    showRegionInformation() {
        return this.searchService.hasMoved() || this.autocomplete.result instanceof Region;
    }
}
