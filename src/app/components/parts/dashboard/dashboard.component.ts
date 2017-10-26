import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import '@mapd/mapdc/dist/mapdc.js';
import { Subscription } from 'rxjs/Subscription';
import { SearchBarService } from '../../../services/search-bar-service';
import { MapdService } from '../../../services/mapd.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { MatDialog } from '@angular/material';
import { FeedbackComponent } from '../feedback/feedback.component';
import { Subject } from 'rxjs/Subject';
import * as Raven from 'raven-js';
import { environment } from '../../../../environments/environment';
import { ChartsService, ChartType } from '../../../services/charts.service';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';
import { CompareDialogComponent } from '../compare-dialog/compare-dialog.component';
import { Region } from '../../../model/region';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [SearchBarService, MapdService, CrossfilterService, ChartsService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];

    query: string = null;
    regionFilter: any;
    error = '';
    searchError = '';
    loading = true;
    showSql = false;
    total = 0;
    subtotal = 0;

    errors = new Subject<any>();
    ranges = new Subject<Region>();
    dx: any;

    chartType = ChartType;

    constructor(public searchBarService: SearchBarService,
                private cd: ChangeDetectorRef,
                private mapd: MapdService,
                public cf: CrossfilterService,
                public dialog: MatDialog,
                public cs: ChartsService) {

        this.subscriptions.push(this.errors.subscribe((e) => {
            if (environment.production) {
                Raven.captureMessage(e);
            } else {
                console.error(e);
            }

            this.error = 'There was an internal error and our team has been notified. ' +
                'In the meantime please try again or contact us at sgc@garvan.org.au';
            this.cd.detectChanges();
        }));
    }

    ngOnInit() {
        this.subscriptions.push(this.cf.updates.debounceTime(100).subscribe(() => {
            const p1 = this.cf.x.sizeAsync().then((v) => {
                this.total = v;
            });
            const p2 = this.cf.all.valueAsync().then((v) => {
                this.subtotal = v;
            });
            Promise.all([p1, p2]).then(() => this.cd.detectChanges());
        }));

        this.initialise().then(() => {
            this.cd.detectChanges();
            this.cf.updates.next();
        }).catch((e) => this.errors.next(e));
    }

    initialise() {
        return this.mapd.connect().then((session) => {
            return this.cf.create(session, 'mgrb').then((x: any) => {
                // session.getFields('mgrb', (err, res) => console.log(res));
                this.setupCharts(x);
                this.dx = x;
            });
        });
    }

    setupCharts(x) {
        this.loading = true;
        this.regionFilter = x.filter(false);
        this.loading = false;
    }

    clearFilters() {
        this.searchBarService.query = '';
        this.regionFilter.filterAll();
        dc.filterAll();
        dc.redrawAllAsync().then(() => {
            return dc.redrawAllAsync().then(() => {
                this.cf.updates.next();
            });
        }).catch((e) => this.errors.next(e));
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    addGeneOrRegion = (q) => {
        this.searchBarService.query = q;
        const obj = {query: q};
        this.searchError = '';

        this.searchBarService.searchWithParams(obj).then((v) => {
            if (!v) {
                return;
            }
            v.region().then((r) => {
                dc.filterAll();
                this.cs.getChart("Chromosome").dc.filter(r.chromosome);
                // let filterString = `((c3_START >= ${r.start} AND c3_START <= ${r.end}))`;
                // this.regionFilter.filter(filterString);
                dc.redrawAllAsync().then(() => {
                    this.ranges.next(r);
                });
            });
        }).catch(e => {
            this.searchError = e;
            this.cd.detectChanges();
        });
    };

    openFeedback() {
        this.dialog.open(FeedbackComponent);
    }

    toggleSql() {
        this.showSql = !this.showSql;
    }

    sqlTooltip() {
        const v = this.showSql ? 'Hide' : 'Show';
        return `${v} generated SQL`;
    }

    saveFilters() {
        this.dialog.open(SaveDialogComponent, {
            data: {
                sql: this.cf.sql,
                cs: this.cs
            }
        });
    }

    getTags() {
        return this.cs.getTags();
    }

    loadFilters(tag) {
        this.cs.loadFilters(tag);
    }

    compare() {
        this.dialog.open(CompareDialogComponent, {
            data: {
                cs: this.cs,
                mapd: this.mapd
            }
        });
    }
}
