import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Chart, ChartType } from '../../../services/charts.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { Subscription } from 'rxjs/Subscription';

const SMALL_WIDTH = 740;
const LARGE_WIDTH = window.innerWidth > 2000 ? 1200 : window.innerWidth / 1.3;
const LARGE_HEIGHT = 150;
const RANGE_HEIGHT = 70;
const MAX_BOUNDS = 249240280;
const MIN_BOUNDS = 0;

@Component({
    selector: 'app-mapd-avg-af-chart',
    templateUrl: './mapd-avg-af-chart.component.html',
    styleUrls: ['./mapd-avg-af-chart.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapdAvgAfChartComponent implements AfterViewInit, OnDestroy {
    rangeChart = new Chart('range', 'c3_START', ChartType.Custom);
    afAvgChart = new Chart('AvgAF', 'c3_START', ChartType.Custom);
    rangeBounds = [MIN_BOUNDS, MAX_BOUNDS];
    error = '';
    subscriptions: Subscription[] = [];

    largeChartStyle = {'width': `${LARGE_WIDTH}px`, 'height': `${LARGE_HEIGHT}px`};
    rangeChartStyle = {'width': `${LARGE_WIDTH}px`, 'height': `${RANGE_HEIGHT}px`};

    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH}px)`);

    constructor(private cf: CrossfilterService, private cd: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        const startDim = this.cf.x.dimension('c3_START');

        if (!startDim) {
            this.error = 'This chart could not be displayed';
            this.cd.detectChanges();
            return;
        }

        const afExpression = [{
            expression: 'AF',
            agg_mode: 'avg',
            name: 'afavg'
        }];

        const width = this.isSmallScreen() ? window.innerWidth / 2 : LARGE_WIDTH;
        this.rangeChart.dc = dc.barChart('#variantCount')
            .width(width)
            .height(RANGE_HEIGHT)
            .x(d3.scale.linear().domain(this.rangeBounds))
            .brushOn(true)
            .elasticY(true)
            .elasticX(true)
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

        this.rangeChart.dc.prepareLabelEdit = () => {};

        this.rangeChart.dc.xAxis().scale(this.rangeChart.dc.x()).orient('bottom');
        this.rangeChart.dc.render();

        this.afAvgChart.dc = dc.barChart('#afAvg')
            .width(width)
            .height(LARGE_HEIGHT)
            .x(d3.scale.linear().domain(this.rangeBounds))
            .brushOn(true)
            .elasticY(true)
            .elasticX(true)
            .yAxisLabel(`AVG AF`)
            .dimension(startDim)
            .margins({top: 10, right: 0, bottom: 30, left: 60})
            .valueAccessor((d) => d.afavg)
            .renderLabel(false)
            .rangeChart(this.rangeChart.dc)
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

    isSmallScreen(): boolean {
        return this.mediaMatcher.matches;
    }
}
