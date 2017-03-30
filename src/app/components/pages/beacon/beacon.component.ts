import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncResult, BeaconSearchService } from '../../../services/beacon/beacon-search-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-beacon-search',
    templateUrl: './beacon.component.html',
    styleUrls: ['./beacon.component.css', '../../../shared/table-results.css']
})
export class BeaconComponent implements OnInit, OnDestroy {
    availableReferences: string[] = ['HG19'];
    reference = this.availableReferences[0];
    example1 = '22:46546565>A';
    example2 = '2:45895>G';
    pageSize = 10;
    currentPage = 1;

    labels = [
        'Name', 'Organization', 'Response'
    ];

    labelsSortingMap: any = {
        'Name': (a: AsyncResult) => a.result ? a.result.beacon.name.toLowerCase() : '',
        'Organization': (a: AsyncResult) => a.result ? a.result.beacon.organization.toLowerCase() : '',
        'Response': (a: AsyncResult) => a.displayResult(),
    };
    errorMessage: string;
    searchInput = '';
    responses: AsyncResult[] = [];
    private lastSortedLabel = '';
    private lastSortedOrder = true;
    private subscriptions: Subscription[] = [];

    constructor(private beaconSearchService: BeaconSearchService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.subscriptions.push(this.beaconSearchService.errors.subscribe((e: any) => {
            this.errorMessage = e.message ? e.message : e;
        }));

        this.subscriptions.push(this.route.params.subscribe(p => this.parseParams(p)));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    onSubmit() {
        let obj = {query: this.searchInput, timestamp: Date.now()};
        this.router.navigate(['/beacon', obj]);
    }

    sortResponses(label: string) {
        if (this.lastSortedLabel === label) {
            this.lastSortedOrder = this.lastSortedOrder ? false : true;
        } else {
            this.lastSortedLabel = label;
            this.lastSortedOrder = true;
        }
        let fn = this.labelsSortingMap[label];
        if (this.lastSortedOrder) {
            this.responses = this.responses.sort((a: any, b: any) => {
                if (fn(a) > fn(b)) {
                    return -1;
                } else if (fn(a) < fn(b)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            this.responses = this.responses.sort((a: any, b: any) => {
                if (fn(a) < fn(b)) {
                    return -1;
                } else if (fn(a) > fn(b)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
    }

    private searchBeacon(query: string) {
        this.errorMessage = '';
        let result = this.beaconSearchService.searchBeacon(query);
        this.responses = result.responses;
    }

    parseParams(params: Params) {
        if (!params['query']) {
            return;
        }
        this.searchInput = params['query'];
        this.searchBeacon(params['query']);
    }
}
