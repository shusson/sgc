import {
    Component, OnInit, Input, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit,
} from '@angular/core';
import { Variant } from '../../../model/variant';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { VariantPin, VariantTrackService } from '../../../services/genome-browser/variant-track-service';

import * as Papa from 'papaparse';
import { VariantSearchService } from '../../../services/variant-search-service';
import { TableService } from '../../../services/table-service';
import { VsalService } from '../../../services/vsal-service';

const MINIMAL_VIEW = 500;

@Component({
    selector: 'app-variants-table',
    templateUrl: './variants-table.component.html',
    styleUrls: ['./variants-table.component.css', '../../../shared/table-results.css']
})
export class VariantsTableComponent implements OnInit, OnDestroy, AfterViewInit {
    variants: Variant[] = [];
    pageSize = 10;
    currentPage = 1;
    skip = 0;
    dbSnpUrl = Variant.dbSnpUrl;
    showSettings = true;
    private highlightedVariantIndex: number;
    private subscriptions: Subscription[] = [];

    constructor(public  ts: TableService,
                public  searchService: VariantSearchService,
                private vsal: VsalService,
                private variantTrack: VariantTrackService,
                private cd: ChangeDetectorRef,
                private router: Router) {
    }

    ngOnInit() {
        if (window.screen.width < MINIMAL_VIEW) {
            this.ts.minimalView();
            this.showSettings = false;
        }

        this.updatePage(this.currentPage);

        this.subscriptions.push(this.variantTrack.highlightedVariant.subscribe((v: VariantPin) => {
            if (v.variant.highlight) {
                this.highlightedVariantIndex = v.index - this.skip;
            } else {
                this.highlightedVariantIndex = null;
            }
            this.cd.detectChanges();
        }));

        this.subscriptions.push(this.variantTrack.clickedVariant.subscribe((vp: VariantPin) => {
            const p = Math.ceil(vp.index / this.pageSize);
            this.updatePage(p);
            this.cd.detectChanges();
        }));

    }

    ngAfterViewInit() {
        this.subscriptions.push(this.searchService.results.subscribe(() => {
            this.updatePage(1);
            this.cd.detectChanges();
        }));
    }

    highlightVariant(variant: Variant, localIndex) {
        const index = this.skip + localIndex;
        variant.highlight = true;
        this.variantTrack.highlightedVariant.next(new VariantPin(variant.start, variant.af, '', variant, index));
    }

    unHighlightVariant(variant: Variant, localIndex) {
        const index = this.skip + localIndex;
        variant.highlight = false;
        this.variantTrack.highlightedVariant.next(new VariantPin(variant.start, variant.af, '', variant, index));
    }

    sortVariants(label: string) {
        this.ts.sort(label, this.variants);
    }

    downloadFile() {
        // get annotated data for up to 10000
        const data = this.variants.map((v: Variant) => {
            return {
                'Chrom': v.chr,
                'Position': v.start,
                'RSID': v.rsid,
                'Reference': v.ref,
                'Alternate': v.alt,
                'Type': v.type,
                'Homozygotes Count': v.nHomVar,
                'Heterozygotes Count': v.nHet,
                'Allele Count': v.ac,
                'Allele Frequency': v.af,
                'cato': v.cato,
                'eigen': v.eigen,
                'sift': v.sift,
                'polyPhen': v.polyPhen,
                'tgpAF': v.tgpAF,
                'hrcAF': v.hrcAF,
                'gnomadAF': v.gnomadAF,
                'consequences': v.consequences,
                'gene': v.geneSymbol,
                'clinvar': v.clinvar
            };
        });
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], {type: 'text/plain'});
        saveAs(blob, 'mgrb_' + this.searchService.getCurrentRegion().name() + '_' + new Date().getTime() + '.csv');
    }

    compare(a: Variant, b: Variant) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    variantUrl(v: Variant) {
        return this.router.createUrlTree(['/search/variant', {query: Variant.displayName(v)}]).toString();
    }

    toggleScales($event) {
        $event.stopPropagation();
        this.ts.showScales = !this.ts.showScales;
    }

    activateColumn($event, key) {
        $event.stopPropagation();
        this.ts.set(key, !this.ts.get(key))
    }

    updatePage(pageNumber) {
        this.currentPage = pageNumber;
        this.skip = this.pageSize * (this.currentPage - 1);

        this.vsal.getVariantsWithAnnotations(this.searchService.lastQuery, this.pageSize, this.skip).toPromise().then((vr) => {
            this.variants = vr.variants;
            this.cd.detectChanges();
        });
    }

}
