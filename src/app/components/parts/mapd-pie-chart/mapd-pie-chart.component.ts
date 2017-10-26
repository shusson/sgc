import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart, ChartsService } from '../../../services/charts.service';
import { CrossfilterService } from '../../../services/crossfilter.service';

const SMALL_WIDTH = 180;
const SMALL_HEIGHT = 180;
const INNER_RADIUS = 30;

@Component({
    selector: 'app-mapd-pie-chart',
    templateUrl: './mapd-pie-chart.component.html',
    styleUrls: ['./mapd-pie-chart.component.css']
})
export class MapdPieChartComponent implements AfterViewInit {
    @Input() filter: any;
    @Input() chart: Chart;

    smallChartStyle = {'width': `${SMALL_WIDTH}px`, 'height': `${SMALL_HEIGHT}px`};

    constructor(public cs: ChartsService, private cfs: CrossfilterService) {
    }


    ngAfterViewInit(): void {
        const dim = this.filter.dimension(this.chart.dimension);
        const group = this.chart.group(dim).reduceCount();
        const chart = this.cs.setChart(this.chart.name, dc.pieChart(`#${this.chart.name}`)
            .width(SMALL_WIDTH)
            .height(SMALL_HEIGHT)
            .innerRadius(INNER_RADIUS)
            .slicesCap(100)
            .othersGrouper(false)
            .dimension(dim)
            .group(group.reduceCount()));

        chart.dc.on('preRedraw', (c) => {
            this.cfs.updates.next(c);
        });

        chart.dc.renderAsync();
    }
}
