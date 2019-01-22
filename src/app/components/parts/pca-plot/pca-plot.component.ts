import { AfterViewInit, Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse'
import { Observable } from "rxjs";

const PLOT_WIDTH = window.innerWidth <= 500 ? 320 : 500;
const PLOT_HEIGHT = window.innerWidth <= 500 ? 300 : 400;

@Component({
    selector: 'app-pca-plot',
    templateUrl: './pca-plot.component.html',
    styleUrls: ['./pca-plot.component.css']
})
export class PcaPlotComponent implements AfterViewInit {
    @Input() name = '';
    @Input() title: string;
    @Input() axis: [string, string];
    @Input() height = PLOT_HEIGHT;
    @Input() width = PLOT_WIDTH;

    options: any;
    chart: any;
    loaded = false;

    constructor(private http: HttpClient) {
    }

    ngAfterViewInit(): void {

        this.options = {
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                backgroundColor: 'rgba(0,0,0,0)',
                width: this.width,
                height: this.height
            },
            title: {
                text: this.title
            },
            subtitle: {
                text: 'MGRB + 1000G'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'PCA2'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {},
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 70,
                y: 0,
                floating: true,
                backgroundColor: '#FFFFFF',
                borderWidth: 1
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                }
            },
            animation: false,
            tooltip: {
                enabled: false,
            }

        };

        this.chart = Highcharts.chart(this.name, this.options);
        this.update();
    }

    getData(): Observable<any> {
        return this.http.get('assets/mgrb_pca.tsv', {responseType: 'text'}).delay(1000).map(this.parseData);
    }

    parseData = (data) => {
        const tsv = Papa.parse(data, {delimiter: '\t', header: true});

        const points: PCAData[] = tsv.data;
        const series: any = {};

        for (const d of points) {
            if (!d.SuperPopulation) {
                continue;
            }

            if (!series.hasOwnProperty(d.SuperPopulation)) {
                series[d.SuperPopulation] = {
                    name: d.SuperPopulation,
                    type: 'scatter',
                    events: {
                        legendItemClick: () => false
                    },
                    data: [[Number(d[this.axis[0]]), Number(d[this.axis[1]])]]
                };
            } else {
                series[d.SuperPopulation].data.push([Number(d[this.axis[0]]), Number(d[this.axis[1]])]);
            }
        }

        return series;
    };

    update() {
        if (!this.loaded) {
            this.chart.showLoading();

            this.chart.setTitle({
                text: this.title,
                margin: 0
            });

            this.chart.xAxis[0].update({
                title: {
                    text: this.axis[0]
                }
            });

            this.chart.yAxis[0].update({
                title: {
                    text: this.axis[1]
                }
            });

            this.getData().subscribe((series: any) => {
                if (this.loaded) {
                    return;
                }
                this.loadPcaData(series);
                this.chart.hideLoading();
            });
        }
    }

    loadPcaData(series: any) {
        for (const k of Object.keys(series)) {
            if (k === 'MGRB') {
                continue;
            }
            this.chart.addSeries(series[k], false);
        }
        this.chart.addSeries(series['MGRB'], false);

        this.loaded = true;
        this.chart.redraw();
    }

}

class PCAData {
    [index: string]: string;
    SuperPopulation: string;
    Population: string;
    PC1: string;
    PC2: string;
    PC3: string;
    PC4: string;
    PC5: string;
    PC6: string;
    PC7: string;
    PC8: string;
    PC9: string;
    PC10: string;
}
