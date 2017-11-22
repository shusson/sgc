import { Component, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Variant } from '../../../model/variant';
import { MAXIMUM_NUMBER_OF_VARIANTS } from '../../../services/cttv-service';

import { VariantSearchService } from '../../../services/variant-search-service';
import { Subscription } from 'rxjs/Subscription';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { SearchBarService } from '../../../services/search-bar-service';
import { VariantAutocompleteResult } from '../../../model/autocomplete-result';
import { Gene } from '../../../model/gene';
import { Region } from '../../../model/region';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css'],
    providers: [VariantSearchService, VariantTrackService]
})
export class SearchResultsComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() autocomplete: VariantAutocompleteResult<any>;
    @Output() errorEvent = new EventEmitter();
    showClin = false;
    public variants: Variant[] = [];
    public loadingVariants = false;
    private subscriptions: Subscription[] = [];
    maximumNumberOfVariants = MAXIMUM_NUMBER_OF_VARIANTS;
    selectedTabIndex = 0;
    timeout = null;

    constructor(public searchService: VariantSearchService,
                private cd: ChangeDetectorRef,
                private searchBarService: SearchBarService,
                private router: Router,
                private route: ActivatedRoute) {
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

        this.loadingVariants = true;
        this.autocomplete.search(this.searchService, this.searchBarService.options)
            .then(() => {
                this.loadingVariants = false;
                this.cd.detectChanges();
            })
            .catch((e) => {
                this.loadingVariants = false;
                this.errorEvent.emit(e);
            });
    }

    ngAfterViewInit() {
        this.route.params.subscribe(p => {
            if (p['demo']) {
                this.selectedTabIndex = 1;
                this.showClinicalFilters();
            }
        });
    }

    ngOnDestroy() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    showGeneInformation() {
        return !this.searchService.hasMoved() && this.autocomplete.result instanceof Gene;
    }

    showRegionInformation() {
        return this.searchService.hasMoved() || this.autocomplete.result instanceof Region;
    }

    // workaround because dc.js is not playing nice with angular and material tabs
    // in particular dc.js is trying to access an element with is not available
    // ngAfterViewInit in the clinical-chart
    showClinicalFilters() {
        const c = document.getElementsByClassName('clinical-filters');
        if (c.length) {
            this.showClin = true;
        } else {
            this.timeout = window.setTimeout(() => {
                this.showClinicalFilters();
            }, 200)
        }
    }

    goToSmallerRegion() {
        const obj = {query: this.searchService.getSmallerRegionString(), timestamp: Date.now()};
        this.router.navigate(['/search/results', obj]);
    }

    tabSelected(v) {
        if (v.index === 1) {
            this.showClinicalFilters();
        }
    }
}
