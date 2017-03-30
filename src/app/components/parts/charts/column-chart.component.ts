import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-column-chart',
    template: `
        <chart [options]="options" (load)="saveInstance($event.context)"></chart>
    `
})
export class ColumnChartComponent {
    @Input() title: string;
    @Input() data: number[];
    @Input() width: string;
    @Input() height: string;

    options: any;
    chart: any;

    constructor() {
        this.options = {
            chart: {
                width: 95,
                height: 120,
                spacing: [0, 0, 0, 0],
                showAxes: false,
                backgroundColor: 'rgba(0,0,0,0)'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                allowDecimals: false,
                visible: true,
                tickInterval: 50,
            },

            yAxis: {
                visible: false
            },

            legend: {
                enabled: false
            },
            tooltip: {
                valueDecimals: 0,
                formatter: function() {
                    return this.point.name + ': ' + this.y;
                }
            }
        };
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
            type: 'column',
            pointPadding: 0,
            borderWidth: 1,
            groupPadding: 0,
            shadow: false,
            color: '#003263'
        });

        this.chart.setSize(this.width, this.height);
        this.chart.redraw();
    }


}
