import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { SearchFilterItem } from '../../../model/search-filter-item';
import { SearchFilterService } from '../../../services/search-filter.service';
import { VariantSearchService } from '../../../services/variant-search-service';

@Component({
    selector: 'app-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

    constructor(public sfs: SearchFilterService) {
    }

    ngOnInit() {
    }

}
