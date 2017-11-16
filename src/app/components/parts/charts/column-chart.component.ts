import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-column-chart',
    template: `
        <div></div>
    `
})
export class ColumnChartComponent implements AfterViewInit {
    @Input() title: string;
    @Input() data: number[];
    @Input() width: string;
    @Input() height: string;

    options: any;
    chart: any;

    constructor(private elf: ElementRef) {}

    ngAfterViewInit() {
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

        this.chart = Highcharts.chart(this.elf.nativeElement, this.options);
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
            margin: 0,
            style: {
                fontSize: '12px'
            }
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
