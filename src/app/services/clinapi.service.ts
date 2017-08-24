import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { VariantSearchService } from './variant-search-service';
import { VariantTrackService } from './genome-browser/variant-track-service';

@Injectable()
export class ClinapiService {
    samples = [];
    samplesGroup: any;
    changes = new Subject();
    constructor(private http: Http,
                private vss: VariantSearchService,
                private vts: VariantTrackService) {
        this.changes.debounceTime(300).subscribe(v => {
            this.samples = this.samplesGroup.all().filter(s => s.value > 0).map(s => s.key);
            this.vss.lastQuery.samples = this.samples;
            this.vts.updateData();
        });
    }

    getPatients(): Observable<any> {
        return this.http.get(environment.clinicalUrl).map((v) => {
            return v.json();
        });
    }

}
