import { Injectable } from '@angular/core';
import { CrossfilterService } from './crossfilter.service';

export class Dimension {
    name = '';
    type = '';
}

export class BasicFilter {
    constructor(public filter = '') {

    }
    filterString() {
        return this.filter;
    }
}

export class DimensionFilter extends BasicFilter {
    dimension: Dimension;
    operator = '';
    value: any;

    filterString() {
        const v =  typeof this.value === 'string' ? `'${this.value}'` : this.value;
        return `${this.dimension.name}${this.operator}${v}`;
    }
}

@Injectable()
export class MapdFilterService {
    columns: Dimension[] = [];
    globalFilter: any;
    activeFilters: BasicFilter[] = [];

    init(cfs: CrossfilterService) {
        this.globalFilter = cfs.x.filter(true);
    }

    addFilter(filter: BasicFilter) {
        this.activeFilters.push(filter);
        this.globalFilter.filter(this.filterString());
    }

    clearFilters() {
        this.activeFilters = [];
        this.globalFilter.filterAll();
    }

    stringOperators() {
        return ["=", "!="];
    }

    numericOperators() {
        return ["=", "<=", "<", ">", ">=", "!="];
    }

    private filterString() {
        return this.activeFilters.map(f => f.filterString()).join(' OR ');
    }

}
