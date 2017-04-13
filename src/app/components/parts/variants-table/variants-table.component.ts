import {
    Component, OnInit, Input, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit,
    ElementRef
} from '@angular/core';
import { Variant, HOMOZYGOTES_KEY, HETEROZYGOTES_KEY, MISSED_GENOTYPES_KEY } from '../../../model/variant';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';

import * as Papa from 'papaparse';
import { VariantSearchService } from '../../../services/variant-search-service';
import { ColumnService } from '../../../services/column-service';
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
    private highlightedVariant: Variant;
    private subscriptions: Subscription[] = [];

    constructor(public  columnService: ColumnService,
                private searchService: VariantSearchService,
                private variantTrack: VariantTrackService,
                private cd: ChangeDetectorRef,
                private router: Router) {
    }

    ngOnInit() {
        if (window.screen.width < MINIMAL_VIEW) {
            this.columnService.minimalView();
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
            let index = this.variants.findIndex((v => this.compare(v, variant)));
            this.currentPage = Math.ceil((index + 1) / this.pageSize);
            this.cd.detectChanges();
        }));

        this.subscriptions.push(this.variantTrack.clickedVariant.subscribe((variant: Variant) => {
            let index = this.variants.findIndex((v => this.compare(v, variant)));
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
        this.columnService.sort(label, this.variants);
    }

    downloadFile() {
        let data = this.variants.map((variant: Variant) => {
            return {
                'Chrom': variant.chromosome,
                'Position': variant.start,
                'RSID': variant.dbSNP,
                'Reference': variant.reference,
                'Alternate': variant.alternate,
                'Type': variant.type,
                'Homozygotes Count': variant.variantStats[0].genotypesCount[HOMOZYGOTES_KEY],
                'Heterozygotes Count': variant.variantStats[0].genotypesCount[HETEROZYGOTES_KEY],
                'Missed Genotypes': variant.variantStats[0].genotypesCount[MISSED_GENOTYPES_KEY],
                'Allele Count': variant.variantStats[0].altAlleleCount,
                'Allele Frequency': variant.variantStats[0].altAlleleFreq,
            };
        });
        let csv = Papa.unparse(data);
        let blob = new Blob([csv], {type: 'text/plain'});
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

        return ['/search/variant', {query: Variant.displayName(v)}];
    }

}
