import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { VariantSearchService } from '../../../services/variant-search-service';
import { SearchQuery } from '../../../model/search-query';
import { Variant } from '../../../model/variant';
import { BeaconCache, BeaconSearchService } from '../../../services/beacon/beacon-search-service';
import { EnsemblService } from '../../../services/ensembl-service';
import { Gene } from '../../../model/gene';
import { RegionService } from '../../../services/autocomplete/region-service';
import { Region } from '../../../model/region';

@Component({
    selector: 'app-variant',
    templateUrl: './variant.component.html',
    styleUrls: ['./variant.component.css', '../../../shared/meta-information.css'],
    providers: [VariantSearchService, BeaconSearchService]
})
export class VariantComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    variant: Variant;
    dbSnpUrl = Variant.dbSnpUrl;
    beacons: BeaconCache;
    gene: Gene;
    showBeacon = false;
    error = '';
    loading = true;
    beaconSupported = true;

    constructor(private route: ActivatedRoute,
                private vss: VariantSearchService,
                private bss: BeaconSearchService,
                private rs: RegionService) {
    }

    ngOnInit() {
        this.subscriptions.push(this.route.params.subscribe(p => this.parseParams(p)));
    }

    parseParams(params: Params) {
        let start = Number(params['start']);
        let alternate = params['alternate'];
        let sq = new SearchQuery(params['chromosome'], start, start, []);
        this.vss.getVariants(sq).then(variants => {
            this.loading = false;
            let vf = variants.filter((v) => v.alternate === alternate);
            if (vf.length > 1) {
                this.error = 'Found more than one variant for query';
            } else if (vf.length > 0) {
                this.variant = vf[0];
                if (this.variant.alternate.length !== 1) {
                    this.beaconSupported = false;
                }
                this.beacons = this.bss.searchBeacon(this.beaconQuery(this.variant));
                let r = new Region(this.variant.chromosome, this.variant.start, this.variant.start);
                this.rs.getGenesInRegion(r).subscribe((g) => {
                    if (g.length > 0) {
                        this.gene = g[0];
                    }
                });
            } else {
                this.error = 'Found no variants for query';
            }
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    beaconQuery(v: Variant) {
        return `${ v.chromosome }:${ v.start }>${v.alternate}`;
    }

    toggleBeacon() {
        this.showBeacon = !this.showBeacon;
    }
}
