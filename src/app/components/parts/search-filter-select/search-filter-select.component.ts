import { Component, OnInit } from '@angular/core';
import { SearchFilterService } from '../../../services/search-filter.service';
import { SearchFilterItem } from '../../../model/search-filter-item';

@Component({
    selector: 'app-search-filter-select',
    templateUrl: './search-filter-select.component.html',
    styleUrls: ['./search-filter-select.component.css']
})
export class SearchFilterSelectComponent implements OnInit {

    constructor(public sfs: SearchFilterService) {

    }

    ngOnInit() {
    }

    selectItem(v: SearchFilterItem) {
        this.sfs.addItem(v);
    }

}
