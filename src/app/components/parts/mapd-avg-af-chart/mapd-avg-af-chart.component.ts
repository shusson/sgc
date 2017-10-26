import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Chart, ChartsService, ChartType } from '../../../services/charts.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Region } from '../../../model/region';

const LARGE_WIDTH = window.innerWidth / 1.3 > 1090 ? 1090 : window.innerWidth / 1.3;
const LARGE_HEIGHT = 200;
const RANGE_HEIGHT = 70;
const MAX_BOUNDS = 249240280;
const MIN_BOUNDS = 0;

@Component({
    selector: 'app-mapd-avg-af-chart',
    templateUrl: './mapd-avg-af-chart.component.html',
    styleUrls: ['./mapd-avg-af-chart.component.css']
})
export class MapdAvgAfChartComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() filter: any;
    @Input() ranges: Subject<any>;
    rangeChart = new Chart('range', 'c3_START', ChartType.Custom);
    afAvgChart = new Chart('AvgAF', 'c3_START', ChartType.Custom);
    rangeBounds = [MIN_BOUNDS, MAX_BOUNDS];

    subscriptions: Subscription[] = [];

    largeChartStyle = {'width': `${LARGE_WIDTH}px`, 'height': `${LARGE_HEIGHT}px`};
    rangeChartStyle = {'width': `${LARGE_WIDTH}px`, 'height': `${RANGE_HEIGHT}px`};


    constructor(public cs: ChartsService, private cfs: CrossfilterService) {
    }

    ngOnInit() {
        this.subscriptions.push(this.ranges.debounceTime(100).subscribe((r: Region) => {
            if (r) {
                this.rangeChart.dc.filter([r.start, r.end]);
            }
            const f = this.rangeChart.dc.filter();
            if (f) {
                const range = [f[0], f[1]];
                this.afAvgChart.dc.binParams([{
                    numBins: 200,
                    binBounds: range,
                    timeBin: false
                }]);
                this.afAvgChart.dc.x(d3.scale.linear().domain(range));
            } else {
                this.afAvgChart.dc.binParams([{
                    numBins: 100,
                    binBounds: this.rangeBounds,
                    timeBin: false
                }]);
                this.afAvgChart.dc.x(d3.scale.linear().domain(this.rangeBounds));
            }
            this.afAvgChart.dc.xAxis().scale(this.afAvgChart.dc.x());

            this.rangeChart.dc.redrawAsync();
            this.afAvgChart.dc.redrawAsync().then(() => {
                this.cfs.updates.next();
            });

        }));
    }


    ngAfterViewInit(): void {
        const startDim = this.filter.dimension('c3_START');

        const afExpression = [{
            expression: 'AF',
            agg_mode: 'avg',
            name: 'afavg'
        }];

        this.rangeChart.dc = dc.barChart('#variantCount')
            .width(LARGE_WIDTH)
            .height(RANGE_HEIGHT)
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

        this.rangeChart.dc.prepareLabelEdit = () => {
        };

        this.rangeChart.dc.xAxis().scale(this.rangeChart.dc.x()).orient('bottom');
        this.rangeChart.dc.render();

        this.afAvgChart.dc = dc.barChart('#afAvg')
            .width(LARGE_WIDTH)
            .height(LARGE_HEIGHT)
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

        this.afAvgChart.dc.prepareLabelEdit = () => {
        };

        this.afAvgChart.dc.xAxis().scale(this.afAvgChart.dc.x()).orient('bottom');
        this.afAvgChart.dc.render();

        // TODO: handle click
        // afa.dc.on("renderlet.foo", (chart) => {
        //     chart.selectAll('rect').on("click", (d) => {
        //         console.log("click!", d);
        //     });
        // });

        this.rangeChart.dc.on('preRedraw', (c) => this.ranges.next());
    }


    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    resetAfAvgChart() {
        this.afAvgChart.dc.filterAll();
        this.rangeChart.dc.filterAll();
        dc.redrawAllAsync();
    }

    afAvgHasFilter() {
        const c = this.afAvgChart.dc;
        return c && c.filters().length > 0 || (this.rangeChart.dc && this.rangeChart.dc.filters().length > 0);
    }
}
