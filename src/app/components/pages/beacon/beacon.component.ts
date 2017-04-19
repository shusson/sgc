import { Component, OnInit, OnDestroy } from '@angular/core';
import { BeaconAsyncResult, BeaconCache, BeaconSearchService } from '../../../services/beacon/beacon-search-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-beacon-search',
    templateUrl: './beacon.component.html',
    styleUrls: ['./beacon.component.css'],
    providers: [BeaconSearchService]
})
export class BeaconComponent implements OnInit, OnDestroy {
    availableReferences: string[] = ['HG19'];
    reference = this.availableReferences[0];
    example1 = '22:46546565>A';
    example2 = '2:45895>G';
    errorMessage: string;
    searchInput = '';
    beacons: BeaconCache;
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

    private searchBeacon(query: string) {
        this.errorMessage = '';
        this.beacons = this.beaconSearchService.searchBeacon(query);
    }

    parseParams(params: Params) {
        if (!params['query']) {
            return;
        }
        this.searchInput = params['query'];
        this.searchBeacon(params['query']);
    }
}
