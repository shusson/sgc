import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import * as Raven from 'raven-js';
import { TStats } from '../../../model/t-stats';

@Component({
    selector: 'app-compare-dialog',
    templateUrl: './compare-dialog.component.html',
    styleUrls: ['./compare-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareDialogComponent implements OnInit {

    dim: string;
    f0: string;
    f1: string;

    stats0: TStats;
    stats1: TStats;

    data0: any[];
    data1: any[];

    tValue: number;

    error: string;

    constructor(public dialogRef: MdDialogRef<CompareDialogComponent>,
                @Inject(MD_DIALOG_DATA) public data: any,
                public cd: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    tTest() {
        this.tValue = this.calcTValue(this.stats0, this.stats1);
    }

    calcTValue(s1: TStats, s2: TStats): number {
        const dx = s1.mean - s2.mean;
        const  v = (s1.dev / s1.n) + (s2.dev / s2.n);
        return (dx) / Math.sqrt(v);
    }

    getStats(q: string, key: string): Promise<TStats> {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(key0) as n, STDDEV_SAMP(${key}) as dev, AVG(${key}) as mean FROM (${q}) as T`;
            this.data.mapd.session.query(query, {},
                (error, data) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(new TStats(data[0]["dev"], data[0]["mean"], data[0]["n"]));
                }
            );
        });
    }

    getData(q: string, key: string): Promise<TStats> {
        return new Promise((resolve, reject) => {
            this.data.mapd.session.query(q, {},
                (error, data) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    const result = data.slice(0, 20).map(v => {
                        return {
                            y: v[key],
                            name: v.key0
                        };
                    });
                    resolve(result);
                }
            );
        });
    }

    updateDim(v: string) {
        this.dim = v;
        if (this.f0) {
            this.updateS1(this.f0);
        }

        if (this.f1) {
            this.updateS2(this.f1);
        }
    }

    updateS1(v: string) {
        this.f0 = v;
        this.data0 = null;
        this.tValue = null;
        this.cd.detectChanges();
        this.updateSample(this.f0).then(d => {
            this.stats0 = d[0];
            this.data0 = d[1];
            this.cd.detectChanges();
        }).catch(this.handleError);

    }

    updateS2(v: string) {
        this.f1 = v;
        this.data1 = null;
        this.tValue = null;
        this.cd.detectChanges();
        this.updateSample(this.f1).then(d => {
            this.stats1 = d[0];
            this.data1 = d[1];
            this.cd.detectChanges();
        }).catch(this.handleError);
    }

    updateSample(filter: string): Promise<any[]> {
        const c = this.data.cs.getChart(this.dim);
        const re = c.dc.group().writeTopQuery(Infinity, undefined, true, false);
        const key = c.dc.group().getReduceExpression().split("AS")[1].trim();

        const fs = this.data.cs.getFilter(filter);
        const q = re.split("GROUP BY").join(`WHERE ${fs} GROUP BY`);
        return Promise.all([this.getStats(q, key), this.getData(q, key)]);
    }

    handleError = (e) => {
        Raven.captureMessage(e);
        this.error = "An unexpected error occurred, our engineers have been notified. " +
            "Please try again or contact support sgc@garvan.org.au";
        this.cd.detectChanges();
    };

    isInvalid() {
        return !(!!this.dim && !!this.f0 && !!this.f1);
    }
}
