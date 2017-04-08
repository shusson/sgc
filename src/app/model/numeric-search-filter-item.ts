import { SearchFilterItem } from './search-filter-item';

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

    isValid(): boolean {

        let s = Number(this.start);
        let e = Number(this.end);
        switch (this.operator) {
            case 'is':
                if (s === null) {
                    return false;
                }
                return s > this.min && s < this.max;
            case 'is between':
                if (s === null || e === null) {
                    return false;
                }
                return s > this.min && s < this.max &&
                    e > this.min && e < this.max &&
                    s <= e;

            default:
                return false;
        }
    }
}
