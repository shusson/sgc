import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart, ChartsService } from '../../../services/charts.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import * as d3 from 'd3';
import '@mapd/mapdc/dist/charting.js';

const SMALL_WIDTH = 180;
const SMALL_HEIGHT = 230;

@Component({
    selector: 'app-mapd-row-chart',
    templateUrl: '../mapd-pie-chart/mapd-chart.component.html',
    styleUrls: ['./mapd-row-chart.component.css', '../mapd-pie-chart/mapd-chart.component.css']
})
export class MapdRowChartComponent implements AfterViewInit {
    @Input() chart: Chart;
    smallChartStyle = {'width': `${SMALL_WIDTH}px`, 'height': `${SMALL_HEIGHT}px`};
    hover = false;
    error = '';

    constructor(public cs: ChartsService, private cfs: CrossfilterService) {
    }

    ngAfterViewInit() {
        if (!this.chart) {
            this.error = 'This chart could not be displayed';
            return;
        }
        const dim = this.cfs.x.dimension(this.chart.dimension).setEliminateNull(!this.cs.showNullValues);
        const group = this.chart.group(dim).reduceCount();
        const chart = this.cs.setChart(this.chart.dimension, dc.rowChart(`#${this.chart.dimension}`)
            .width(SMALL_WIDTH)
            .height(SMALL_HEIGHT)
            .dimension(dim)
            .cap(this.chart.cap)
            .othersGrouper(false)
            .elasticX(true)
            .group(group)
            .autoScroll(true));

        chart.dc.margins().left = 5;
        chart.dc.margins().right = 0;
        chart.dc.xAxis().ticks(2);

        chart.dc.on('preRedraw', (c) => {
            this.cfs.updates.next(c);
        });

        chart.dc.renderAsync();
    }

}
