import { Injectable } from '@angular/core';

class Column {
    name = '';
    type = '';
    is_array: boolean;
    is_dict: boolean;
}


export class Filter {
    column: Column;
    operator = '';
    value: any;
}

export class StringFilter extends Filter {
    value = '';
}

export class NumericFilter extends Filter {
    value: number;
}

@Injectable()
export class MapdFilterService {
    columns: Column[] = [];
    activeFilters = [];

    constructor() {
    }

    stringOperators() {
        return ["CONTAINS", "EQUALS", "NOT CONTAINS", "NOT EQUALS", "IS NULL", "NOT NULL"];
    }

    numericOperators() {
        return ["=", "<=", "<", ">", ">=", "!=", "IS NULL", "NOT NULL"];
    }

}
