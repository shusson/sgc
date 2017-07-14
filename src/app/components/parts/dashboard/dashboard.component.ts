import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import '@mapd/mapdc/dist/mapdc.js';
import { Subscription } from 'rxjs/Subscription';
import { SearchBarService } from '../../../services/search-bar-service';
import { MapdService } from '../../../services/mapd.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { MdDialog } from '@angular/material';
import { FeedbackComponent } from '../feedback/feedback.component';
import { Subject } from 'rxjs/Subject';
import * as Raven from 'raven-js';
import { environment } from '../../../../environments/environment';

const MAX_BOUNDS = 249240280;
const MIN_BOUNDS = 0;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [SearchBarService, MapdService, CrossfilterService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
    altChart: any;
    refChart: any;
    typeChart: any;
    afAvgChart: any;
    afCountChart: any;
    rangeChart: any;
    chromChart: any;
    rsidChart: any;

    LARGE_WIDTH = window.innerWidth / 1.3 > 1090 ? 1090 : window.innerWidth / 1.3;
    LARGE_HEIGHT = 280;
    SMALL_WIDTH = 280;
    SMALL_HEIGHT = 280;

    RANGE_HEIGHT = 70;

    subscriptions: Subscription[] = [];
    rangeBounds = [MIN_BOUNDS, MAX_BOUNDS];
    chromDim: any;

    query: string = null;
    regionFilter: any;
    error = '';
    searchError = '';
    loading = true;
    showSql = false;
    total = 0;
    subtotal = 0;

    errors = new Subject<any>();
    ranges = new Subject<any>();

    largeChartStyle = {'width': `${this.LARGE_WIDTH}px`, 'height': `${this.LARGE_HEIGHT}px`};
    smallChartStyle = {'width': `${this.SMALL_WIDTH}px`, 'height': `${this.SMALL_HEIGHT}px`};
    rangeChartStyle = {'width': `${this.LARGE_WIDTH}px`, 'height': `${this.RANGE_HEIGHT}px`};

    constructor(public searchBarService: SearchBarService,
                private cd: ChangeDetectorRef,
                private mapd: MapdService,
                public cf: CrossfilterService,
                public dialog: MdDialog) {

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
            let p1 = this.cf.x.sizeAsync().then((v) => {
                this.total = v;
            });
            let p2 = this.cf.all.valueAsync().then((v) => {
                this.subtotal = v;
            });
            Promise.all([p1, p2]).then(() => this.cd.detectChanges());
        }));

        this.subscriptions.push(this.ranges.debounceTime(100).subscribe(() => {
            let f = this.rangeChart.filter();
            if (f) {
                let range = [f[0], f[1]];
                this.afAvgChart.binParams([{
                    numBins: 200,
                    binBounds: range,
                    timeBin: false
                }]);
                this.afAvgChart.x(d3.scale.linear().domain(range));
            } else {
                this.afAvgChart.binParams([{
                    numBins: 100,
                    binBounds: this.rangeBounds,
                    timeBin: false
                }]);
                this.afAvgChart.x(d3.scale.linear().domain(this.rangeBounds));
            }
            this.afAvgChart.xAxis().scale(this.afAvgChart.x());

            this.afAvgChart.redrawAsync().then(() => {
                this.cf.updates.next();
            });

        }));

        this.initialise().then(() => {
            this.cd.detectChanges();
            this.cf.updates.next();
        }).catch((e) => this.errors.next(e));
    }

    initialise() {
        return this.mapd.connect().then((session) => {
            return this.cf.create(session, 'mgrb').then((x: any) => {
                this.setupCharts(x);
                return dc.renderAllAsync();
            });
        });
    }

    setupCharts(x) {
        this.loading = true;
        this.regionFilter = x.filter(false);
        this.chromDim = x.dimension('chromosome').order('val');
        let startDim = x.dimension('c3_START');
        let altDim = x.dimension('ALT');
        let typeDim = x.dimension('TYPE');
        let refDim = x.dimension('c4_REF');
        let afDim = x.dimension('AF');

        let rsid = x.dimension('case when RSID = \'.\' then False else True end');

        this.rsidChart = dc.pieChart('#rsidCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .innerRadius(45)
            .slicesCap(100)
            .othersGrouper(false)
            .dimension(rsid)
            .group(rsid.group().reduceCount());

        let afGroup = afDim.group().binParams([{
            numBins: 10,
            binBounds: [0, 1],
            timeBin: false
        }]);

        let afExpression = [
            {
                expression: 'AF',
                agg_mode: 'avg',
                name: 'afavg'
            }];

        let chromGroup = this.chromDim.group().reduceCount();

        this.chromChart = dc.rowChart('#chromCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .dimension(this.chromDim)
            .cap(30)
            .othersGrouper(false)
            .elasticX(true)
            .margins({top: 0, right: 0, bottom: 20, left: 5})
            .group(chromGroup);

        this.chromChart.xAxis().ticks(2);

        this.afCountChart = dc.rowChart('#afCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .dimension(afDim)
            .cap(30)
            .othersGrouper(false)
            .elasticX(true)
            .margins({top: 0, right: 0, bottom: 20, left: 5})
            .group(afGroup.reduceCount());
        this.afCountChart.xAxis().ticks(2);

        this.altChart = dc.pieChart('#altCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .innerRadius(45)
            .slicesCap(100)
            .othersGrouper(false)
            .dimension(altDim)
            .group(altDim.group().reduceCount());

        this.refChart = dc.pieChart('#refCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .innerRadius(45)
            .slicesCap(100)
            .othersGrouper(false)
            .dimension(refDim)
            .group(refDim.group().reduceCount());

        this.typeChart = dc.rowChart('#typeCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .dimension(typeDim)
            .cap(10)
            .othersGrouper(false)
            .elasticX(true)
            .margins({top: 0, right: 0, bottom: 20, left: 5})
            .group(typeDim.group().reduceCount());
        this.typeChart.xAxis().ticks(2);

        this.rangeChart = dc.barChart('#variantCount')
            .width(this.LARGE_WIDTH)
            .height(this.RANGE_HEIGHT)
            .x(d3.scale.linear().domain(this.rangeBounds))
            .brushOn(true)
            .elasticY(true)
            // .elasticX(true)
            .dimension(startDim)
            .centerBar(true)
            .gap(1)
            .margins({top: 0, right: 0, bottom: 35, left: 60})
            .renderLabel(false)
            .xAxisLabel(`Chromosomal Coordinates`)
            .group(startDim.group().setBinParams([{
                numBins: 50,
                binBounds: this.rangeBounds,
                timeBin: false
            }]).reduceCount());

        this.rangeChart.prepareLabelEdit = () => {
        };

        this.rangeChart.xAxis().scale(this.rangeChart.x()).orient('bottom');

        this.afAvgChart = dc.barChart('#afAvg')
            .width(this.LARGE_WIDTH)
            .height(this.LARGE_HEIGHT)
            .x(d3.scale.linear().domain(this.rangeBounds))
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel(`AVG AF`)
            .dimension(startDim)
            .margins({top: 10, right: 0, bottom: 30, left: 60})
            .valueAccessor((d) => d.afavg)
            .renderLabel(false)
            .group(startDim.group().setBinParams([{
                numBins: 100,
                binBounds: this.rangeBounds,
                timeBin: false
            }]).reduce(afExpression));

        this.afAvgChart.prepareLabelEdit = () => {
        };

        this.afAvgChart.xAxis().scale(this.afAvgChart.x()).orient('bottom');

        // TODO: handle click
        // this.afAvgChart.on("renderlet.foo", (chart) => {
        //     chart.selectAll('rect').on("click", (d) => {
        //         console.log("click!", d);
        //     });
        // });

        this.rangeChart.on('preRedraw', (c) => this.ranges.next());

        let detectChanges = (ct, type) => {
            ct.on(type, (chart) => {
                this.cf.updates.next(chart);
            });
        };

        detectChanges(this.chromChart, 'preRedraw');
        detectChanges(this.afAvgChart, 'preRedraw');
        detectChanges(this.altChart, 'preRedraw');
        detectChanges(this.typeChart, 'preRedraw');
        detectChanges(this.afCountChart, 'preRedraw');
        detectChanges(this.refChart, 'preRedraw');

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
        let obj = {query: q};
        this.searchError = '';

        this.searchBarService.searchWithParams(obj).then((v) => {
            if (!v) {
                return;
            }
            v.region().then((r) => {
                dc.filterAll();
                this.chromChart.filter(r.chromosome);
                this.rangeChart.filter([r.start, r.end]);
                // let filterString = `((c3_START >= ${r.start} AND c3_START <= ${r.end}))`;
                // this.regionFilter.filter(filterString);
                dc.redrawAllAsync().then(() => {
                    this.ranges.next();
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

    resetChrom() {
        this.chromChart.filterAll();
        dc.redrawAllAsync();
    }

    chromHasFilter() {
        return this.chromChart && this.chromChart.filters().length > 0;
    }

    resetAltChart() {
        this.altChart.filterAll();
        dc.redrawAllAsync();
    }

    altHasFilter() {
        return this.altChart && this.altChart.filters().length > 0;
    }

    resetRefChart() {
        this.refChart.filterAll();
        dc.redrawAllAsync();
    }

    refHasFilter() {
        return this.refChart && this.refChart.filters().length > 0;
    }

    resetTypeChart() {
        this.typeChart.filterAll();
        dc.redrawAllAsync();
    }

    typeHasFilter() {
        return this.typeChart && this.typeChart.filters().length > 0;
    }

    resetAfAvgChart() {
        this.afAvgChart.filterAll();
        this.rangeChart.filterAll();
        dc.redrawAllAsync();
    }

    afAvgHasFilter() {
        return this.afAvgChart && this.afAvgChart.filters().length > 0 || this.rangeHasFilter();
    }

    resetAfCountChart() {
        this.afCountChart.filterAll();
        dc.redrawAllAsync();
    }

    afCountHasFilter() {
        return this.afCountChart && this.afCountChart.filters().length > 0;
    }

    rangeHasFilter() {
        return this.rangeChart && this.rangeChart.filters().length > 0;
    }

    toggleSql() {
        this.showSql = !this.showSql;
    }

    sqlTooltip() {
        let v = this.showSql ? 'Hide' : 'Show';
        return `${v} generated SQL`;
    }

    resetdbSNPChart() {
        this.rsidChart.filterAll();
        dc.redrawAllAsync();
    }

    dbSNPHasFilter() {
        return this.rsidChart && this.rsidChart.filters().length > 0;
    }
}
