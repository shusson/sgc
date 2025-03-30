import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { VariantSearchService } from '../../../services/variant-search-service';
import { SearchQuery } from '../../../model/search-query';
import { Variant } from '../../../model/variant';
import { BeaconCache, BeaconSearchService } from '../../../services/beacon/beacon-search-service';
import { Gene } from '../../../model/gene';
import { RegionService } from '../../../services/autocomplete/region-service';
import { Region } from '../../../model/region';
import { SearchOption } from '../../../model/search-option';
import { Auth } from '../../../services/auth-service';

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
    beaconError = '';
    loading = true;
    beaconSupported = true;
    displayName = Variant.displayName;

    constructor(private route: ActivatedRoute,
                private vss: VariantSearchService,
                private bss: BeaconSearchService,
                private rs: RegionService,
                private cd: ChangeDetectorRef,
                private auth: Auth) {
    }

    ngOnInit() {
        if (!this.auth.authenticated()) {
            this.auth.login();
        } else {
            this.subscriptions.push(this.bss.errors.subscribe((e: any) => {
                this.beaconError = e.message ? e.message : e;
            }));
            this.subscriptions.push(this.route.params.subscribe(p => this.parseParams(p)));
        }
    }

    parseParams(params: Params) {
        try {
            const r = /([\dxymt]*)-(\d*)-([AGTC\*]*)-([AGTC\*]*)+/ig;
            const m = r.exec(params['query']);
            const chromo = m[1];
            const start = Number(m[2]);
            const reference = m[3];
            const alternate = m[4];

            const sq = new SearchQuery(chromo, start, start, [new SearchOption('', 'returnAnnotations', [], 'true')]);
            this.getVariant(sq, reference, alternate);
        } catch (e) {
            this.error = 'Could not find specified variant';
            this.loading = false;
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    beaconQuery(v: Variant) {
        return `${ v.chr }:${ v.start }>${v.alt}`;
    }

    toggleBeacon() {
        this.showBeacon = !this.showBeacon;
    }

    private getVariant(sq: SearchQuery, reference: string, alternate: string) {
        this.vss.getVariants(sq).then(variants => {
            this.loading = false;
            const vf = variants.filter((v) => v.alt === alternate && v.ref === reference);
            if (vf.length > 1) {
                this.error = 'Found more than one variant for query';
            } else if (vf.length > 0) {
                this.variant = vf[0];
                if (this.variant.type !== 'SNP') {
                    this.beaconSupported = false;
                } else {
                    this.beacons = this.bss.searchBeacon(this.beaconQuery(this.variant));
                    this.subscriptions.push(this.beacons.results.debounceTime(500).subscribe(() => {
                        this.cd.detectChanges();
                    }));
                }

                const r = new Region(this.variant.chr, this.variant.start, this.variant.start);
                this.rs.getGenesInRegion(r).subscribe((g) => {
                    if (g.length > 0) {
                        this.gene = g[0];
                    }
                }, (e) => {});
            } else {
                this.error = 'Found no variants for query';
            }
            this.cd.detectChanges();
        });
    }
}
