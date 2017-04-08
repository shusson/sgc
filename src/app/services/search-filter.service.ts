import { Injectable } from '@angular/core';
import { SearchFilterItem } from '../model/search-filter-item';
import { NumericSearchFilterItem } from '../model/numeric-search-filter-item';
import { EnumSearchFilterItem } from '../model/enum-search-filter-item';
import { URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchFilterService {

    updates: Subject<any> = new Subject<any>();

    availableItems: SearchFilterItem[] = [
        new NumericSearchFilterItem('Year Of Birth', 1800, 2100, 'yr'),
        new NumericSearchFilterItem('Systolic Blood Pressure', 0, 300, 'mmHg'),
        new NumericSearchFilterItem('Height', 0, 300, 'cm'),
        new NumericSearchFilterItem('Weight', 0, 300, 'kg'),
        new NumericSearchFilterItem('Abdominal Circumference', 0, 300, 'cm'),
        new NumericSearchFilterItem('Glucose', 0, 10, 'mmol/L'),
        new EnumSearchFilterItem('Gender', ['Male', 'Female'])
    ];

    appliedItems: SearchFilterItem[] = [];

    constructor() {
    }

    addItem(v: SearchFilterItem) {
        v.enabled = true;
        let index = this.availableItems.findIndex((item) => item.name === v.name);
        this.availableItems.splice(index, 1);
        this.appliedItems.push(v);
        this.updates.next();
    }

    removeItem(v: SearchFilterItem) {
        let index = this.appliedItems.findIndex((item) => item.name === v.name);
        this.appliedItems.splice(index, 1);
        this.availableItems.push(v);
        this.updates.next();
    }

    toggleItem(v: SearchFilterItem) {
        v.enabled = !v.enabled;
        this.updates.next();
    }

    updateOperator(v: SearchFilterItem, op: string) {
        v.operator = op;
        if (op === 'is' && v.hasOwnProperty('end')) {
            v.end = v.start;
        }
        this.updates.next();
    }

    updateStart(v: SearchFilterItem, s: string) {
        v.start = s;
        if (v.operator === 'is' && v.hasOwnProperty('end')) {
            v.end = v.start;
        }
        this.updates.next();
    }

    updateEnd(v: SearchFilterItem, e: string) {
        v.end = e;
        this.updates.next();
    }

}
