import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { VariantSearchService } from './variant-search-service';
import { VariantTrackService } from './genome-browser/variant-track-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth-service';

@Injectable()
export class ClinapiService {
    samples = [];
    samplesGroup: any;
    changes = new Subject();
    constructor(private http: HttpClient,
                private vss: VariantSearchService,
                private vts: VariantTrackService) {
        this.changes.debounceTime(300).subscribe(v => {
            this.samples = this.samplesGroup.all().filter(s => s.value > 0).map(s => s.key);

            // HACK
            if (this.samples.length >= 1139) {
                this.vss.lastQuery.samples = [];
            } else {
                this.vss.lastQuery.samples = this.samples;
            }
            // HACK

            this.vts.updateData();
        });
    }

    getPatients(): Observable<any> {
        const headers = new HttpHeaders()
            .append("Authorization", "Bearer " + Auth.getToken());
        return this.http.get(environment.clinicalUrl, {headers: headers});
    }

}
