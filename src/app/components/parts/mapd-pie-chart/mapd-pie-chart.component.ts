import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart, ChartsService } from '../../../services/charts.service';
import { CrossfilterService } from '../../../services/crossfilter.service';

const SMALL_WIDTH = 180;
const SMALL_HEIGHT = 180;
const INNER_RADIUS = 30;

@Component({
    selector: 'app-mapd-pie-chart',
    templateUrl: './mapd-chart.component.html',
    styleUrls: ['./mapd-chart.component.css']
})
export class MapdPieChartComponent implements AfterViewInit {
    @Input() chart: Chart;

    smallChartStyle = {'width': `${SMALL_WIDTH}px`, 'height': `${SMALL_HEIGHT}px`};
    hover = false;
    error = '';

    constructor(public cs: ChartsService, private cfs: CrossfilterService) {
    }

    ngAfterViewInit(): void {
        if (!this.chart) {
            this.error = 'This chart could not be displayed';
            return;
        }
        const dim = this.cfs.x.dimension(this.chart.dimension);
        const group = this.chart.group(dim).reduceCount();
        const chart = this.cs.setChart(this.chart.dimension, dc.pieChart(`#${this.chart.dimension}`)
            .width(SMALL_WIDTH)
            .height(SMALL_HEIGHT)
            .innerRadius(INNER_RADIUS)
            .slicesCap(this.chart.cap)
            .othersGrouper(false)
            .dimension(dim)
            .group(group.reduceCount()));

        chart.dc.on('preRedraw', (c) => {
            this.cfs.updates.next(c);
        });

        chart.dc.renderAsync();
    }
}
