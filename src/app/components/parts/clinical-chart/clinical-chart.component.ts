import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as dc from 'dc';
import { ClinicalChart } from '../clincal-filtering/clincal-filtering.component';
import { ClinapiService } from '../../../services/clinapi.service';

@Component({
    selector: 'app-clinical-chart',
    templateUrl: './clinical-chart.component.html',
    styleUrls: ['./clinical-chart.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClinicalChartComponent implements AfterViewInit, OnDestroy {
    @Input() data: ClinicalChart;
    selectedMin = 0;
    selectedMax = 100;
    chart: any;

    constructor(private cd: ChangeDetectorRef,
                private cs: ClinapiService) {
    }


    ngAfterViewInit(): void {
        this.selectedMin = this.data.min;
        this.selectedMax = this.data.max;

        if (this.data.type === "bar") {
            this.initBar();
        } else {
            this.initPie();
        }

        this.chart.on("filtered", (c) => {
            const f = c.filter();
            if (f) {
                this.selectedMin = f[0];
                this.selectedMax = f[1];
            } else {
                if (this.data.type === 'pie') {
                    this.selectedMin = this.data.min;
                    this.selectedMax = this.data.max;
                } else {
                    this.selectedMin = this.chart.xAxisMin();
                    this.selectedMax = this.chart.xAxisMax();
                }
            }
            this.cd.detectChanges();
            this.cs.changes.next();
        });

        this.data.xAxisFormating.forEach(f => {
            f(this.chart.xAxis());
        });

        this.chart.render();
        this.cd.detectChanges();
    }

    initBar() {
        this.chart = dc.barChart(`.chart .${this.data.name}`)
            .width(window.innerWidth > 400 ? 320 : 220)
            .height(100)
            .x(d3.scale.linear().domain([this.data.min, this.data.max]))
            .brushOn(true)
            .elasticX(true)
            .elasticY(true)
            .yAxisLabel(this.data.yAxisLabel)
            .xAxisLabel(this.data.xAxisLabel)
            .dimension(this.data.dim)
            .margins({top: 15, right: 20, bottom: 45, left: 50})
            .group(this.data.dim.group().reduceCount());

        this.chart.yAxis().ticks(3);

        this.selectedMin = this.chart.xAxisMin();
        this.selectedMax = this.chart.xAxisMax();
    }

    initPie() {
        this.chart = dc.pieChart(`.chart .${this.data.name}`)
            .width(120)
            .height(120)
            .slicesCap(2)
            .innerRadius(20)
            .dimension(this.data.dim)
            .group(this.data.dim.group().reduceCount());
    }


    ngOnDestroy(): void {
        dc.chartRegistry.deregister(this.chart)
    }
}
