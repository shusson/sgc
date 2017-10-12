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
import { ChartsService } from '../../../services/charts.service';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';
import { CompareDialogComponent } from '../compare-dialog/compare-dialog.component';

const MAX_BOUNDS = 249240280;
const MIN_BOUNDS = 0;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [SearchBarService, MapdService, CrossfilterService, ChartsService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {

    LARGE_WIDTH = window.innerWidth / 1.3 > 1090 ? 1090 : window.innerWidth / 1.3;
    LARGE_HEIGHT = 200;
    SMALL_WIDTH = 200;
    SMALL_HEIGHT = 200;
    INNER_RADIUS = 30;

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
                public dialog: MdDialog,
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

        this.subscriptions.push(this.ranges.debounceTime(100).subscribe(() => {
            const rangeChart = this.cs.getChart("range").dc;
            const afAvgChart = this.cs.getChart("afAvg").dc;
            const f = rangeChart.filter();
            if (f) {
                const range = [f[0], f[1]];
                afAvgChart.binParams([{
                    numBins: 200,
                    binBounds: range,
                    timeBin: false
                }]);
                afAvgChart.x(d3.scale.linear().domain(range));
            } else {
                afAvgChart.binParams([{
                    numBins: 100,
                    binBounds: this.rangeBounds,
                    timeBin: false
                }]);
                afAvgChart.x(d3.scale.linear().domain(this.rangeBounds));
            }
            afAvgChart.xAxis().scale(afAvgChart.x());

            afAvgChart.redrawAsync().then(() => {
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
        const startDim = x.dimension('c3_START');
        const altDim = x.dimension('ALT');
        const typeDim = x.dimension('TYPE');
        const refDim = x.dimension('c4_REF');
        const afDim = x.dimension('AF');
        const clinvarDim = x.dimension('clinvar');
        const conDim = x.dimension('consequences');
        const gnomadDim = x.dimension('gnomadAF');
        const ployphenDim = x.dimension('polyPhen');
        const siftDim = x.dimension('sift');
        const eigenDim = x.dimension('eigen');

        const rsid = x.dimension('case when RSID is NULL then False else True end');

        this.cs.setChart("rsid", dc.pieChart('#rsidCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .innerRadius(this.INNER_RADIUS)
            .slicesCap(100)
            .othersGrouper(false)
            .dimension(rsid)
            .group(rsid.group().reduceCount()));

        const afGroup = afDim.group().binParams([{
            numBins: 10,
            binBounds: [0, 1],
            timeBin: false
        }]);

        const gnomadAFGroup = gnomadDim.group().binParams([{
            numBins: 10,
            binBounds: [0, 1],
            timeBin: false
        }]);

        const eigenGroup = eigenDim.group().binParams([{
            numBins: 12,
            binBounds: [-4.2, 1.4],
            timeBin: false
        }]);

        const afExpression = [
            {
                expression: 'AF',
                agg_mode: 'avg',
                name: 'afavg'
            }];

        const cc = this.cs.setChart("chrom", dc.rowChart('#chromCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .dimension(this.chromDim)
            .cap(30)
            .othersGrouper(false)
            .elasticX(true)
            .group(this.chromDim.group().reduceCount())
            .autoScroll(true));
        cc.dc.margins().left = 5;
        cc.dc.margins().right = 0;
        cc.dc.xAxis().ticks(2);

        const afc = this.cs.setChart("afCount", dc.rowChart('#afCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .dimension(afDim)
            .cap(30)
            .othersGrouper(false)
            .elasticX(true)
            .group(afGroup.reduceCount())
            .autoScroll(true));
        afc.dc.margins().left = 5;
        afc.dc.margins().right = 0;
        afc.dc.xAxis().ticks(2);

        const eigenChart = this.cs.setChart("eigen", dc.rowChart('#eigen')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .dimension(eigenDim)
            .cap(30)
            .othersGrouper(false)
            .elasticX(true)
            .group(eigenGroup.reduceCount())
            .autoScroll(true));
        eigenChart.dc.margins().left = 5;
        eigenChart.dc.margins().right = 0;
        eigenChart.dc.xAxis().ticks(2);

        this.cs.setChart("polyPhen", dc.pieChart('#polyPhen')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .innerRadius(this.INNER_RADIUS)
            .slicesCap(100)
            .othersGrouper(false)
            .dimension(ployphenDim)
            .group(ployphenDim.group().reduceCount()));

        this.cs.setChart("sift", dc.pieChart('#sift')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .innerRadius(this.INNER_RADIUS)
            .slicesCap(100)
            .othersGrouper(false)
            .dimension(siftDim)
            .group(siftDim.group().reduceCount()));

        const gafc = this.cs.setChart("gnomadAF", dc.rowChart('#gnomadAF')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .dimension(gnomadDim)
            .cap(30)
            .othersGrouper(false)
            .elasticX(true)
            .group(gnomadAFGroup.reduceCount())
            .autoScroll(true));
        gafc.dc.margins().left = 5;
        gafc.dc.margins().right = 0;
        gafc.dc.xAxis().ticks(2);

        const consequencesChart = this.cs.setChart("consequences", dc.rowChart('#consequences')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .dimension(conDim)
            .cap(100)
            .othersGrouper(false)
            .elasticX(true)
            .group(conDim.group().reduceCount())
            .autoScroll(true));
        consequencesChart.dc.margins().left = 5;
        consequencesChart.dc.margins().right = 0;
        consequencesChart.dc.xAxis().ticks(2);

        const clinvarChart = this.cs.setChart("clinvar", dc.rowChart('#clinvar')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .dimension(clinvarDim)
            .cap(100)
            .othersGrouper(false)
            .elasticX(true)
            .group(clinvarDim.group().reduceCount())
            .autoScroll(true));
        clinvarChart.dc.margins().left = 5;
        clinvarChart.dc.margins().right = 0;
        clinvarChart.dc.xAxis().ticks(2);

        this.cs.setChart("alt", dc.pieChart('#altCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .innerRadius(this.INNER_RADIUS)
            .slicesCap(100)
            .othersGrouper(false)
            .dimension(altDim)
            .group(altDim.group().reduceCount()));

        this.cs.setChart("ref", dc.pieChart('#refCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .innerRadius(this.INNER_RADIUS)
            .slicesCap(100)
            .othersGrouper(false)
            .dimension(refDim)
            .group(refDim.group().reduceCount()));

        const tc = this.cs.setChart("type", dc.rowChart('#typeCount')
            .width(this.SMALL_WIDTH)
            .height(this.SMALL_HEIGHT)
            .dimension(typeDim)
            .cap(10)
            .othersGrouper(false)
            .elasticX(true)
            .group(typeDim.group().reduceCount())
            .autoScroll(true));

        tc.dc.margins().left = 5;
        tc.dc.margins().right = 0;
        tc.dc.xAxis().ticks(2);

        const rc = this.cs.setChart("range", dc.barChart('#variantCount')
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
            }]).reduceCount()));

        rc.dc.prepareLabelEdit = () => {};

        rc.dc.xAxis().scale(rc.dc.x()).orient('bottom');

        const afa = this.cs.setChart("afAvg", dc.barChart('#afAvg')
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
            }]).reduce(afExpression)));

        afa.dc.prepareLabelEdit = () => {};

        afa.dc.xAxis().scale(afa.dc.x()).orient('bottom');

        // TODO: handle click
        // this.afAvgChart.on("renderlet.foo", (chart) => {
        //     chart.selectAll('rect').on("click", (d) => {
        //         console.log("click!", d);
        //     });
        // });

        rc.dc.on('preRedraw', (c) => this.ranges.next());

        const detectChanges = (ct, type) => {
            ct.on(type, (chart) => {
                this.cf.updates.next(chart);
            });
        };

        detectChanges(this.cs.getChart("chrom").dc, 'preRedraw');
        detectChanges(this.cs.getChart("afAvg").dc, 'preRedraw');
        detectChanges(this.cs.getChart("alt").dc, 'preRedraw');
        detectChanges(this.cs.getChart("type").dc, 'preRedraw');
        detectChanges(this.cs.getChart("afCount").dc, 'preRedraw');
        detectChanges(this.cs.getChart("ref").dc, 'preRedraw');

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
                this.cs.getChart("chrom").dc.filter(r.chromosome);
                this.cs.getChart("range").dc.filter([r.start, r.end]);
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

    resetAfAvgChart() {
        this.cs.getChart("afAvg").dc.filterAll();
        this.cs.getChart("range").dc.filterAll();
        dc.redrawAllAsync();
    }

    afAvgHasFilter() {
        let c = this.cs.getChart("afAvg").dc;
        return c && c.filters().length > 0 || this.cs.hasFilter("range");
    }

    toggleSql() {
        this.showSql = !this.showSql;
    }

    sqlTooltip() {
        let v = this.showSql ? 'Hide' : 'Show';
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
