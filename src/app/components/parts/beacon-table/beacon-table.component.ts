import {
    AfterViewInit, Component, Input, OnDestroy, OnInit
} from '@angular/core';
import { BeaconAsyncResult, BeaconCache } from '../../../services/beacon/beacon-search-service';
import { Subscription } from 'rxjs/Subscription';

const MAX_RESULTS = 100;

@Component({
    selector: 'app-beacon-table',
    templateUrl: './beacon-table.component.html',
    styleUrls: ['./beacon-table.component.css', '../../../shared/table-results.css']
})
export class BeaconTableComponent implements OnInit, OnDestroy {
    @Input() minimal = false;
    @Input() limit = MAX_RESULTS;
    @Input() beacons: BeaconCache;
    responses: BeaconAsyncResult[] = [];

    private subs: Subscription[] = [];

    constructor() {
    }

    ngOnInit() {
        if (this.minimal) {
            this.responses = this.beacons.foundResponses();
            this.subs.push(this.beacons.results.subscribe(() => {
                this.responses = this.beacons.foundResponses();
            }));
        } else {
            this.responses = this.beacons.resolvedResponses();
            this.subs.push(this.beacons.results.subscribe(() => {
                this.responses = this.beacons.resolvedResponses();
            }));
        }
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }
}
