import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BeaconAsyncResult, BeaconCache, BeaconSearchService } from '../../../services/beacon/beacon-search-service';
import { Subscription } from 'rxjs/Subscription';
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
    private beaconSub: Subscription;
    private subscriptions: Subscription[] = [];

    constructor(private beaconSearchService: BeaconSearchService,
                private route: ActivatedRoute,
                private router: Router,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.subscriptions.push(this.beaconSearchService.errors.subscribe((e: any) => {
            this.errorMessage = e.message ? e.message : e;
        }));

        this.subscriptions.push(this.route.params.subscribe(p => this.parseParams(p)));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
        if (this.beaconSub) {
            this.beaconSub.unsubscribe();
            this.beaconSub = null;
        }
    }

    onSubmit() {
        const obj = {query: this.searchInput, timestamp: Date.now()};
        this.router.navigate(['/beacon', obj]);
    }

    private searchBeacon(query: string) {
        if (this.beaconSub) {
            this.beaconSub.unsubscribe();
            this.beaconSub = null;
        }
        this.beacons = null;
        this.errorMessage = '';
        this.cd.detectChanges();
        this.beacons = this.beaconSearchService.searchBeacon(query);
        this.beaconSub = this.beacons.results.subscribe(() => this.cd.detectChanges());
    }

    parseParams(params: Params) {
        if (!params['query']) {
            return;
        }
        this.searchInput = params['query'];
        this.searchBeacon(params['query']);
    }
}
