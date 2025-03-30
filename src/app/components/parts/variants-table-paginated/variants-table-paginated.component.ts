import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MapdService } from '../../../services/mapd.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { Variant } from '../../../model/variant';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';

@Component({
    selector: 'app-variants-table-paginated',
    templateUrl: './variants-table-paginated.component.html',
    styleUrls: ['./variants-table-paginated.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantsTablePaginatedComponent implements OnInit, OnDestroy {
    variants = [];
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
        this.getServerResult();
        this.subscriptions.push(this.cf.updates.debounceTime(500).subscribe(() => {
            this.offset = 0;
            this.getServerResult();
        }));
    }

    getServerResult() {
        this.loading = true;
        this.cd.detectChanges();
        const fs = this.cf.getFilterString();
        this.mapd.session.query(`SELECT VARIANT, TYPE, AF, RSID, gnomadAF, clinvar, consequences FROM MGRB ${fs} LIMIT ${this.limit}`,
            {},
            (error, data) => {
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

    variantVarsomeUrl(v: string) {
        let varName = v.replace(/:/g, '-').toString();
        return `https://varsome.com/variant/hg19/${varName}`;
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

    downloadFile() {
        const data = this.variants.map((v: any) => {
            return {
                'Variant': v.VARIANT,
                'RSID': v.RSID,
                'Type': v.TYPE,
                'AF': v.AF,
                'GnomadAF': v.gnomadAF,
                'clinvar': v.clinvar,
                'consequences': v.consequences
            };
        });
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], {type: 'text/plain'});
        saveAs(blob, 'mgrb_' + this.cf.getFilterString().replace(' ', '_') + '_' + new Date().getTime() + '.csv');
    }

}
