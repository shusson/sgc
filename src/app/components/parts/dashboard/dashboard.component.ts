import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
import { Region } from '../../../model/region';
import { AutocompleteResult } from '../../../model/autocomplete-result';
import { Gene } from '../../../model/gene';
import { Position } from '../../../model/position';
import { Dimension, BasicFilter, DimensionFilter, MapdFilterService } from '../../../services/mapd-filter.service';
import { FilterDialogueComponent } from '../filter-dialogue/filter-dialogue.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [SearchBarService, MapdService, CrossfilterService, ChartsService, MapdFilterService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
    subscriptions: Subscription[] = [];

    query: string = null;
    error = '';
    searchError = '';
    loading = true;
    showSql = false;
    total = 0;
    subtotal = 0;
    sql = '';

    errors = new Subject<any>();

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
                this.loading = false;
            });
            this.sql = this.cf.getFilterString();
            this.cf.currentFilters = this.cf.x.getFilter().filter((x) => x);
            Promise.all([p1, p2]).then(() => this.cd.detectChanges());
        }));
    }

    ngAfterViewInit(): void {
        this.loading = true;
        this.mapd.connect().then((session) => {
            return this.cf.create(session, 'mgrb');
        }).then(() => {
            this.cf.updates.next();
            this.cd.detectChanges();
        }).catch((e) => this.errors.next(e));
    }

    clearFilters() {
        this.searchBarService.query = '';
        this.cf.mfs.clearFilters();
        dc.filterAll();
        dc.redrawAllAsync().then(() => {
            this.cf.updates.next();
        }).catch((e) => this.errors.next(e));
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    addGeneOrRegion = (q) => {
        this.searchBarService.query = q;
        const obj = {query: q};
        this.searchError = '';

        this.cf.mfs.clearFilters();

        this.searchBarService.searchWithParams(obj).then((v: AutocompleteResult<Gene | Region | Position>) => {
            if (!v) {
                return;
            }
            if (v.result instanceof Gene) {
                const f = new DimensionFilter();
                f.dimension = new Dimension();
                f.dimension.name = 'gene';
                f.operator = '=';
                f.value = v.result.id;
                this.cf.mfs.addFilter(f);
            } else if (v.result instanceof Region) {
                const r = (<Region>v.result);
                const f = new BasicFilter();
                f.filter = `chromosome='${r.chromosome}' AND c3_START >= ${r.start} AND c3_START <= ${r.end}`;
                this.cf.mfs.addFilter(f);
            } else if (v.result instanceof Position) {
                const p = (<Position>v.result);
                const f = new BasicFilter();
                f.filter = `chromosome='${p.chromosome}' AND c3_START >= ${p.start} AND c3_START <= ${p.end}`;
                this.cf.mfs.addFilter(f);
            }

            dc.redrawAllAsync().then(() => {
                this.cf.updates.next();
            }).catch((e) => this.errors.next(e));
        }).catch(e => {
            this.searchError = e;
            this.cd.detectChanges();
        });
    };

    openFeedback() {
        this.dialog.open(FeedbackComponent);
    }

    toggleSql($event) {
        $event.stopPropagation();
        this.showSql = !this.showSql;
    }

    toggleChart($event, chart) {
        $event.stopPropagation();
        chart.enabled = !chart.enabled;
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(FilterDialogueComponent, {
            width: '440px',
            data: {mfs: this.cf.mfs}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
        });
    }
}
