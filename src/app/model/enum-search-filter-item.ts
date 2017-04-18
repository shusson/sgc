import { SearchFilterItem } from './search-filter-item';

export class EnumSearchFilterItem implements SearchFilterItem {
    enabled = true;
    operators=  ['is'];
    operator = 'is';
    start = '';

    constructor(public name: string,
                public values: string[]) {

    }

    isStartValid() {
        return this.values.indexOf(this.start) !== -1;
    }

    isValid(): boolean {
        return this.isStartValid();
    }

    startInvalidTooltipText(): string {
        return 'Please select a value';
    }
}
