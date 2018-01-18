import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { VariantRequest } from '../model/variant-request';
import { MAXIMUM_NUMBER_OF_VARIANTS } from './cttv-service';
import { VariantTrackService } from './genome-browser/variant-track-service';
import { FAKE_CLINICAL_DATA } from '../mocks/clindata';
import { VariantSearchService } from './variant-search-service';
import * as seedrandom from 'seedrandom';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ClinapiService implements OnDestroy {
    samples = [];
    samplesGroup: any;
    changes = new Subject();
    subs: Subscription[] = [];

    constructor(private vss: VariantSearchService,
                private vts: VariantTrackService) {
        this.subs.push(this.changes.debounceTime(300).subscribe(v => {
            this.vss.filter = this.filterVariants;
            this.samples = this.samplesGroup.all().filter(s => s.value > 0).map(s => s.key);
            const loc = {
                from: this.vss.lastQuery.start,
                to: this.vss.lastQuery.end,
            };

            if (this.vss.variants.length > MAXIMUM_NUMBER_OF_VARIANTS) {
                this.vss.getVariants(this.vss.lastQuery);
            } else {
                vts.track.data().call(vts.track, {
                    'loc' : loc,
                    'on_success' : () => {
                        vts.track.display().update.call(vts.track, loc);
                    }
                });
            }
        }));
    }

    getPatients(demo = false): Observable<any> {
        if (demo) {
            return Observable.of<any>(FAKE_CLINICAL_DATA);
        } else {
            return Observable.throw({status: 401})
        }
    }

    filterVariants = (vp: VariantRequest): VariantRequest => {
        const rng = seedrandom(this.samples.join(""));
        const p = (this.samples.length / FAKE_CLINICAL_DATA.length) + 0.025;
        const vpf = new VariantRequest([]);
        for (let i = 0; i < vp.variants.length; i++) {
            if (rng() < p ) {
                vpf.variants.push(vp.variants[i])
            }
        }
        vpf.total = vpf.variants.length;
        return vpf;
    };

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
        this.vss.filter = null;
    }

}
