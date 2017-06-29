import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MapdService } from '../../../services/mapd.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { Variant } from '../../../model/variant';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
    selector: 'app-variants-table-paginated',
    templateUrl: './variants-table-paginated.component.html',
    styleUrls: ['./variants-table-paginated.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantsTablePaginatedComponent implements OnInit, OnDestroy {
    variants: Variant[] = [];
    error = '';
    loading = true;
    subscriptions: Subscription[] = [];
    limit = 100;
    offset = 0;

    constructor(private mapd: MapdService,
                private cf: CrossfilterService,
                private cd: ChangeDetectorRef,
                private router: Router) {
        // let cols = this.cf.x.getColumns();
        // for (let k of Object.keys(cols)) {
        //     let c = {name: cols[k].column, prop: cols[k].column};
        //     this.columns.push(c);
        // }
    }

    ngOnInit() {
        this.subscriptions.push(this.cf.updates.debounceTime(500).subscribe(() => {
            this.offset = 0;
            this.getServerResult();
        }));
    }

    getServerResult() {
        this.loading = true;
        this.cd.detectChanges();
        let fs = this.cf.x.getFilterString();
        if (fs) {
            fs = 'WHERE ' + fs;
        }
        this.mapd.session.query(`SELECT VARIANT, TYPE, AF, RSID FROM MGRB ${fs} LIMIT ${this.limit}`, {}, (error, data) => {
            if (error) {
                this.error = error;
                return;
            }
            data.map((v) => {
                v.RSID = v.RSID === '.' ?  '' : v.RSID;
                return v;
            });
            this.variants = data;
            this.loading = false;
            this.cd.detectChanges();
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    variantUrl(v: string) {
        return this.router.createUrlTree(['/search/variant', {query: v.replace(/:/g, '-')}]).toString();
    }

    onChange(event: any): void {
        this.offset = event.offset;
    }

    rsidUrl(v: string) {
        return `https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=${v}`;
    }

}
