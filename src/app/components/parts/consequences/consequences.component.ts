import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Variant } from '../../../model/variant';
import { VariantConsequenceType, VariantSOTerm } from '../../../model/variant-annotations';

@Component({
    selector: 'app-consequences',
    templateUrl: './consequences.component.html',
    styleUrls: ['./consequences.component.css', '../../../shared/meta-information.css']
})
export class ConsequencesComponent implements OnInit, AfterViewInit {
    @Input() variant: Variant;
    types: VariantConsequenceType[] = [];

    @ViewChild('consequenceTable') table: any;

    constructor() {
    }

    onActivate(event: any) {
        this.table.rowDetail.toggleExpandRow(event.row);
    }

    ngOnInit() {
        this.types = this.variant.annotation.consequenceTypes;
    }

    ngAfterViewInit() {

    }

    rowClass() {
        return 'clickable';
    }

    displayTerms(terms: VariantSOTerm[]) {
        return terms.map((t) => `{${ t.accession }=>${ t.name }}`).join(', ');
    }

}
