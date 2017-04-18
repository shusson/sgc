import { SearchFilterItem, SearchFilterItemSerialised } from './search-filter-item';

export class NumericSearchFilterItem implements SearchFilterItem {
    enabled = true;
    operators = ['is between', 'is'];
    operator = 'is between';
    start = '';
    end = '';

    constructor(public name: string,
                public min: number,
                public max: number,
                public unit: string) {

    }

    isStartValid(): boolean {
        if (this.start === '') {
            return false;
        }
        let s = Number(this.start);
        if (s === null) {
            return false;
        }
        return s >= this.min && s <= this.max;
    }

    isEndValid(): boolean {
        if (this.start === '' || this.end === '') {
            return false;
        }
        let s = Number(this.start);
        let e = Number(this.end);
        if (s === null || e === null) {
            return false;
        }
        return e >= this.min && e <= this.max && s <= e;
    }

    isValid(): boolean {
        switch (this.operator) {
            case 'is':
                return this.isStartValid();
            case 'is between':
                return this.isStartValid() &&
                        this.isEndValid();
            default:
                return false;
        }
    }

    startInvalidTooltipText(): string {
        return `Value must be between ${ this.min } and ${ this.max }`;
    }

    endInvalidTooltipText(): string {
        return `Value must be between ${ this.min } and ${ this.max } and less than or equal to starting range`;
    }

    isEqual(x: SearchFilterItemSerialised) {
        return this.name === x.name &&
            this.start === x.start &&
            this.end === x.end;
    }

    copy(): SearchFilterItem {
        return new NumericSearchFilterItem(this.name, this.min, this.max, this.unit);
    }
}
