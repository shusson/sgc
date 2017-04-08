import { Component, Input, OnInit } from '@angular/core';
import { SearchFilterItem } from '../../../model/search-filter-item';
import { EnumSearchFilterItem } from '../../../model/enum-search-filter-item';
import { NumericSearchFilterItem } from '../../../model/numeric-search-filter-item';
import { SearchFilterService } from '../../../services/search-filter.service';

@Component({
    selector: 'app-search-filter-parameters',
    templateUrl: './search-filter-parameters.component.html',
    styleUrls: ['./search-filter-parameters.component.css']
})
export class SearchFilterParametersComponent implements OnInit {

    @Input() item: SearchFilterItem;

    constructor(private sfs: SearchFilterService) {
    }

    ngOnInit() {
    }

    showEnum() {
        return this.item instanceof EnumSearchFilterItem;
    }

    showNumeric() {
        return this.item instanceof NumericSearchFilterItem;
    }

    updateOperator(op: string) {
        this.sfs.updateOperator(this.item, op);
    }

    updateStart(v: string) {
        this.sfs.updateStart(this.item, v);
    }

    updateEnd(v: string) {
        this.sfs.updateEnd(this.item, v);
    }

}
