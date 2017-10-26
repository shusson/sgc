import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart, ChartsService } from '../../../services/charts.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import * as d3 from 'd3';
import '@mapd/mapdc/dist/mapdc.js';

const SMALL_WIDTH = 180;
const SMALL_HEIGHT = 230;

@Component({
    selector: 'app-mapd-row-chart',
    templateUrl: '../mapd-pie-chart/mapd-chart.component.html',
    styleUrls: ['./mapd-row-chart.component.css', '../mapd-pie-chart/mapd-chart.component.css']
})
export class MapdRowChartComponent implements AfterViewInit {
    @Input() filter: any;
    @Input() chart: Chart;
    smallChartStyle = {'width': `${SMALL_WIDTH}px`, 'height': `${SMALL_HEIGHT}px`};
    hover = false;

    constructor(public cs: ChartsService, private cfs: CrossfilterService) {
    }

    ngAfterViewInit() {
        const dim = this.filter.dimension(this.chart.dimension);
        const group = this.chart.group(dim).reduceCount();
        const chart = this.cs.setChart(this.chart.name, dc.rowChart(`#${this.chart.dimension}`)
            .width(SMALL_WIDTH)
            .height(SMALL_HEIGHT)
            .dimension(dim)
            .cap(100)
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
