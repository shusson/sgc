import { SearchFilterItem } from './search-filter-item';

export class EnumSearchFilterItem implements SearchFilterItem {
    enabled = true;
    operators=  ['is'];
    operator = 'is';
    start = '';

    constructor(public name: string,
                public values: string[]) {

    }

    isValid(): boolean {
        return this.values.indexOf(this.start) !== -1;
    }
}
