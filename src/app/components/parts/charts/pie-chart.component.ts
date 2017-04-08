import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pie-chart',
    template: `
        <chart [options]="options" (load)="saveInstance($event.context)">
            <series>
                <point (click)="onPointSelect($event)"></point>
            </series>
        </chart>
    `
})
export class PieChartComponent {
    @Input() title: string;
    @Input() data: number[];
    @Input() width: string;
    @Input() height: string;

    options: any;
    chart: any;

    constructor(private router: Router) {
        this.options = {
            chart: {
                width: 85,
                height: 120,
                spacing: [0, 0, 0, 0],
                showAxes: false,
                backgroundColor: 'rgba(0,0,0,0)'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: 2
                    }

                },
            },
            credits: {
                enabled: false
            },
            xAxis: {
                allowDecimals: false,
                visible: true,
                tickInterval: 10
            },

            yAxis: {
                visible: false
            },

            legend: {
                enabled: true
            },
            tooltip: {
                valueDecimals: 0,
                formatter: function() {
                    return this.point.name + ': ' + this.y;
                }
            }
        };
    }

    onPointSelect(e: any) {
    }

    saveInstance(chartInstance: any) {
        this.chart = chartInstance;
        this.update();
    }

    clearSeries() {
        while (this.chart.series.length > 0) {
            this.chart.series[0].remove(true);
        }
    }

    update() {
        this.clearSeries();

        this.chart.setTitle({
            text: this.title,
            margin: 0
        });

        this.chart.addSeries({
            data: this.data,
            type: 'pie',
            pointPadding: 0,
            borderWidth: 1,
            groupPadding: 0,
            shadow: false,
            colors: ['#0D5C63', '#44A1A0']
        });

        this.chart.setSize(this.width, this.height);
        this.chart.redraw();
    }


}
