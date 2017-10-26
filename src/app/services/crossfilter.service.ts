import { Injectable, OnDestroy } from '@angular/core';
import * as crossfilter from '@mapd/crossfilter/dist/mapd-crossfilter.js';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class CrossfilterService implements OnDestroy {
    x: any;
    updates = new Subject<any>();
    subscriptions: Subscription[] = [];
    currentFilters = [];
    all: any;

    constructor() {
        this.subscriptions.push(this.updates.debounceTime(500).subscribe(() => {
            // this.currentFilters = dc.chartRegistry.list().map(c => c.filters().length).reduce((a, b) => a + b, 0);
            this.currentFilters = this.x.getFilter().filter((x) => x).length;
            // update table
        }));
    }

    create(session: any, name): Promise<any> {
        return crossfilter.crossfilter(session, name).then((cf) => {
            this.x = cf;
            this.all = this.x.groupAll();
            return this.x;
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

}
