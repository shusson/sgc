import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MAXIMUM_NUMBER_OF_VARIANTS } from './cttv-service';
import { VariantTrackService } from './genome-browser/variant-track-service';
import { FAKE_CLINICAL_DATA } from '../mocks/clindata';
import { VariantSearchService } from './variant-search-service';
import * as seedrandom from 'seedrandom';
import { Subscription } from 'rxjs/Subscription';
import { of, throwError, Observable } from "rxjs";

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
            return of<any>(FAKE_CLINICAL_DATA);
        } else {
            return throwError({status: 401})
        }
    }

    filterVariants = (v: any[]) => {
        if (this.samples.length >= 1139) {
            return v;
        } else if (this.samples.length === 0) {
            return [];
        }
        const rng = seedrandom(this.samples.join(""));
        const p = (this.samples.length / 1139.0) + 0.025;
        const vf = [];
        for (let i = 0; i < v.length; i++) {
            if (rng() < p ) {
                vf.push(v[i])
            }
        }
        return vf;
    };

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
        this.vss.filter = null;
    }

}
