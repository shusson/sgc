import {
    Component, OnInit, Input, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit,
} from '@angular/core';
import { Variant } from '../../../model/variant';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';

import * as Papa from 'papaparse';
import { VariantSearchService } from '../../../services/variant-search-service';
import { TableService } from '../../../services/table-service';
import { FilterAutoComponent } from '../filter-auto/filter-auto.component';

const DB_SNP_URL = 'https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi';
const MINIMAL_VIEW = 500;

@Component({
    selector: 'app-variants-table',
    templateUrl: './variants-table.component.html',
    styleUrls: ['./variants-table.component.css', '../../../shared/table-results.css']
})
export class VariantsTableComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() variants: Variant[];
    @ViewChild(FilterAutoComponent) filterComponent: FilterAutoComponent;
    pageSize = 10;
    currentPage = 1;
    dbSnpUrl = Variant.dbSnpUrl;
    showSettings = true;
    private highlightedVariant: Variant;
    private subscriptions: Subscription[] = [];

    constructor(public  ts: TableService,
                private searchService: VariantSearchService,
                private variantTrack: VariantTrackService,
                private cd: ChangeDetectorRef,
                private router: Router) {
    }

    ngOnInit() {
        if (window.screen.width < MINIMAL_VIEW) {
            this.ts.minimalView();
            this.showSettings = false;
        }

        this.subscriptions.push(this.variantTrack.highlightedVariant.subscribe((v: Variant) => {
            if (v.highlight) {
                this.highlightedVariant = v;
            } else {
                this.highlightedVariant = null;
            }
            this.cd.detectChanges();
        }));

        this.subscriptions.push(this.variantTrack.clickedVariant.subscribe((variant: Variant) => {
            const index = this.variants.findIndex((v => this.compare(v, variant)));
            this.currentPage = Math.ceil((index + 1) / this.pageSize);
            this.cd.detectChanges();
        }));

        this.subscriptions.push(this.variantTrack.clickedVariant.subscribe((variant: Variant) => {
            const index = this.variants.findIndex((v => this.compare(v, variant)));
            this.currentPage = Math.ceil((index + 1) / this.pageSize);
            this.cd.detectChanges();
        }));

    }

    ngAfterViewInit() {
        this.subscriptions.push(this.searchService.results.subscribe(() => {
            this.currentPage = 0;
            this.filterComponent.reset(this.variants);
            this.cd.detectChanges();
        }));
    }

    highlightVariant(variant: Variant) {
        variant.highlight = true;
        this.variantTrack.highlightedVariant.next(variant);
    }

    unHighlightVariant(variant: Variant) {
        variant.highlight = false;
        this.variantTrack.highlightedVariant.next(variant);
    }

    sortVariants(label: string) {
        this.ts.sort(label, this.variants);
    }

    downloadFile() {
        const data = this.variants.map((v: Variant) => {
            return {
                'Chrom': v.chromosome,
                'Position': v.start,
                'RSID': v.dbSNP,
                'Reference': v.reference,
                'Alternate': v.alternate,
                'Type': v.altType,
                'Homozygotes Count': v.nHomVar,
                'Heterozygotes Count': v.nHet,
                'Allele Count': v.AC,
                'Allele Frequency': v.AF,
                'cato': v.cato,
                'eigen': v.eigen,
                'sift': v.sift,
                'polyPhen': v.polyPhen,
                'tgpAF': v.tgpAF,
                'hrcAF': v.hrcAF,
                'gnomadAF': v.gnomadAF,
                'feature': v.feature,
                'consequences': v.consequences,
                'gene': v.gene,
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

    onFilter(filtered: Variant[]) {
        this.variants = filtered;
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

}
