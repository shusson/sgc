import { Component, Input, OnInit } from '@angular/core';
import { SearchFilterService } from '../../../services/search-filter.service';
import { SearchFilterItem } from '../../../model/search-filter-item';
import { VariantSearchService } from '../../../services/variant-search-service';

@Component({
    selector: 'app-search-filter-item',
    templateUrl: './search-filter-item.component.html',
    styleUrls: ['./search-filter-item.component.css']
})
export class SearchFilterItemComponent implements OnInit {
    @Input() item: SearchFilterItem;

    constructor(private sfs: SearchFilterService, vss: VariantSearchService) {
    }

    ngOnInit() {
    }

    remove() {
        this.sfs.removeItem(this.item);
    }

    enable() {
        this.sfs.toggleItem(this.item);
    }

}
