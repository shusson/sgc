import { Injectable, OnDestroy } from '@angular/core';
import * as crossfilter from '@mapd/crossfilter/dist/mapd-crossfilter.js';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MapdFilterService } from './mapd-filter.service';

@Injectable()
export class CrossfilterService implements OnDestroy {
    x: any;
    updates = new Subject<any>();
    subscriptions: Subscription[] = [];
    currentFilters = [];
    all: any;

    constructor(public mfs: MapdFilterService) {
    }

    getFilterString() {
        let fs = this.x.getFilterString();
        const gfs = this.x.getGlobalFilterString();
        if (gfs && fs) {
            fs += ' AND ' + gfs;
        } else if (gfs) {
            fs = gfs;
        }
        if (fs) {
            fs = 'WHERE ' + fs;
        }
        return fs;
    }

    create(session: any, name): Promise<any> {
        return crossfilter.crossfilter(session, name).then((cf) => {
            this.x = cf;
            this.mfs.init(this);
            this.all = this.x.groupAll();
            return this.x;
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

}
