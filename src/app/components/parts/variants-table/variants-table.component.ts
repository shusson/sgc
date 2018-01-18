import {
    Component, OnInit, Input, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit,
} from '@angular/core';
import { SearchQuery } from '../../../model/search-query';
import { Variant } from '../../../model/variant';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { VariantRequest } from '../../../model/variant-request';
import { VariantPin, VariantTrackService } from '../../../services/genome-browser/variant-track-service';

import * as Papa from 'papaparse';
import { VariantSearchService } from '../../../services/variant-search-service';
import { Sorter, TableService } from '../../../services/table-service';
import { VSAL_VARIANT_LIMIT, VsalService } from '../../../services/vsal-service';

const MINIMAL_VIEW = 500;

@Component({
    selector: 'app-variants-table',
    templateUrl: './variants-table.component.html',
    styleUrls: ['./variants-table.component.css', '../../../shared/table-results.css']
})
export class VariantsTableComponent implements OnInit, OnDestroy, AfterViewInit {
    variants: Variant[] = [];
    total = 0;
    pageSize = 10;
    currentPage = 1;
    skip = 0;
    dbSnpUrl = Variant.dbSnpUrl;
    showSettings = true;
    loadingTable = false;
    loadingDownload = false;
    sorter = new Sorter();
    private highlightedVariant: string;
    private subscriptions: Subscription[] = [];

    constructor(public  ts: TableService,
                public  searchService: VariantSearchService,
                private variantTrack: VariantTrackService,
                private cd: ChangeDetectorRef,
                private router: Router) {
    }

    ngOnInit() {
        if (window.screen.width < MINIMAL_VIEW) {
            this.ts.minimalView();
            this.showSettings = false;
        }

        this.total = this.searchService.total;
        this.updatePage(this.currentPage);

        this.subscriptions.push(this.variantTrack.highlightedVariant.subscribe((vp: VariantPin) => {
            if (vp.variant.highlight) {
                this.highlightedVariant = vp.variant.v;
            } else {
                this.highlightedVariant = null;
            }
            this.cd.detectChanges();
        }));

        this.subscriptions.push(this.variantTrack.clickedVariant.subscribe((vp: VariantPin) => {
            this.sorter.label = 'start';
            this.sorter.descending = false;
            const p = Math.ceil((vp.index + 1) / this.pageSize);
            this.updatePage(p).then(() => {
                this.highlightedVariant = vp.variant.v;
                this.cd.detectChanges();
            });
        }));

    }

    ngAfterViewInit() {
        this.subscriptions.push(this.searchService.results.subscribe((vr: VariantRequest) => {
            this.total = vr.total;
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
        this.sorter = this.ts.sort(label);
        this.updatePage(this.currentPage);
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

    updatePage(pageNumber): Promise<Variant[]> {
        this.loadingTable = true;
        this.currentPage = pageNumber;
        this.skip = this.pageSize * (this.currentPage - 1);

        return this.searchService.getVariantsWithAnnotations(this.searchService.lastQuery,
                                                             this.pageSize,
                                                             this.skip,
                                                             this.sorter.label,
                                                             this.sorter.descending)
            .then((vr) => {
                this.variants = vr.variants;
                this.loadingTable = false;
                this.cd.detectChanges();
                return this.variants;
        });
    }

    updatePageSize(size) {
        this.pageSize = size;
        this.updatePage(this.currentPage);
        this.cd.detectChanges();
    }

    downloadFile() {
        this.loadingDownload = true;
        this.searchService.getVariantsWithAnnotations(this.searchService.lastQuery, VSAL_VARIANT_LIMIT, 0).then((vr) => {
            this.loadingDownload = false;
            const data = vr.variants.map((v: Variant) => {
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
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
