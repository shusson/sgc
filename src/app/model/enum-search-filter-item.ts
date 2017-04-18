import { SearchFilterItem, SearchFilterItemSerialised } from './search-filter-item';

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

    isEqual(x: SearchFilterItemSerialised) {
        return this.name === x.name &&
            this.start === x.start;
    }

    copy(): SearchFilterItem {
        return new EnumSearchFilterItem(this.name, this.values);
    }
}
