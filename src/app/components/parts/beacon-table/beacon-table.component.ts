import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BeaconAsyncResult, BeaconCache } from '../../../services/beacon/beacon-search-service';
import { Subscription } from 'rxjs/Subscription';

const MAX_RESULTS = 100;

@Component({
    selector: 'app-beacon-table',
    templateUrl: './beacon-table.component.html',
    styleUrls: ['./beacon-table.component.css', '../../../shared/table-results.css']
})
export class BeaconTableComponent implements OnInit, OnDestroy {
    @Input() foundOnly = false;
    @Input() pagination = true;
    @Input() beacons: BeaconCache;
    responses: BeaconAsyncResult[] = [];
    pageSize = 10;
    currentPage = 1;

    labels = [
        'Name', 'Organization', 'Response'
    ];

    labelsSortingMap: any = {
        'Name': (a: BeaconAsyncResult) => a.result ? a.result.beacon.name.toLowerCase() : '',
        'Organization': (a: BeaconAsyncResult) => a.result ? a.result.beacon.organization.toLowerCase() : '',
        'Response': (a: BeaconAsyncResult) => a.displayResult(),
    };
    private lastSortedLabel = '';
    private lastSortedOrder = true;
    private subs: Subscription[] = [];

    constructor() {
    }

    sortResponses(label: string) {
        if (this.lastSortedLabel === label) {
            this.lastSortedOrder = !this.lastSortedOrder;
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

    ngOnInit() {
        if (this.foundOnly) {
            this.labels = ['Name', 'Organization'];
            this.responses = this.beacons.foundResponses();
            this.subs.push(this.beacons.results.subscribe(() => {
                this.responses = this.beacons.foundResponses();
            }));
        } else {
            this.responses = this.beacons.responses;
        }

        if (!this.pagination) {
            this.pageSize = MAX_RESULTS;
        }
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }
}
