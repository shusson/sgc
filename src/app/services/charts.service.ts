import { Injectable } from '@angular/core';

import '@mapd/mapdc/dist/mapdc.js';

export enum ChartType {
    Row,
    Pie,
    Custom
}

export class Chart {
    dc: any;
    constructor(public name: string,
                public dimension: string,
                public type: ChartType,
                public groupFn: any = null) {
    }

    tooltip() {
        return `Number of variants by ${this.name}`;
    }

    group(dim: any) {
        return this.groupFn ? this.groupFn(dim) : dim.group();
    }
}

class SerializedChart {
    name = "";
    filters: string[] = [];
}

@Injectable()
export class ChartsService {
    charts = [
        new Chart("afAvg", "AF", ChartType.Custom),
        new Chart("Alt", "ALT", ChartType.Pie),
        new Chart("Ref", "c4_REF", ChartType.Pie),
        new Chart("Category", "TYPE", ChartType.Row),
        new Chart("AF", "AF", ChartType.Row, (dim) => {
            return dim.group().binParams([{
                numBins: 10,
                binBounds: [0, 1],
                timeBin: false
            }]);
        }),
        new Chart("Chromosome", "chromosome", ChartType.Row),
        new Chart("Clinvar", "clinvar", ChartType.Row),
        new Chart("Consequences", "consequences", ChartType.Row),
        new Chart("PolyPhen", "polyPhen", ChartType.Pie),
        new Chart("Sift", "sift", ChartType.Pie),
        new Chart("Eigen", "eigen", ChartType.Row, (dim) => {
            return dim.group().binParams([{
                numBins: 12,
                binBounds: [-4.2, 1.4],
                timeBin: false
            }]);
        })];

    constructor() {
    }

    rowCharts() {
        return this.charts.filter(c => c.type === ChartType.Row);
    }

    pieCharts() {
        return this.charts.filter(c => c.type === ChartType.Pie);
    }

    names() {
        return this.charts.map((c) => c.name);
    }

    getChart(name: string): Chart {
        return this.charts.find((c) => c.name == name);
    }

    setChart(name: string, chart: any) {
        const cc = this.charts.find((c) => c.name == name);
        cc.dc = chart;
        return cc;
    }

    hasFilter(name: string) {
        const c = this.getChart(name).dc;
        return c && c.filters().length > 0;
    }

    reset(name: string) {
        this.getChart(name).dc.filterAll();
        dc.redrawAllAsync();
    }

    saveFilters(tag: string, allFilter: string) {
        const d = {
            allFilter: allFilter,
            charts: this.charts.map((c) => {
                return {name: c.name, filters: c.dc.filters()};
            })
        };

        let tags = localStorage.getItem('tags');
        if (!tags) {
            tags = "[]";
        }
        const jtags = JSON.parse(tags);
        jtags.push(tag);
        localStorage.setItem('tags', JSON.stringify(jtags));
        localStorage.setItem(tag, JSON.stringify(d));
    }

    getFilter(tag: string): string {
        const d = localStorage.getItem(tag);
        return JSON.parse(d).allFilter;
    }

    loadFilters(tag: string) {
        dc.filterAll();
        const d = localStorage.getItem(tag);
        const charts = JSON.parse(d).charts;
        charts.forEach((c: SerializedChart) => {
            c.filters.forEach((f) => {
                this.getChart(c.name).dc.filter(f);
            });
        });
        dc.redrawAllAsync();
    }

    getTags(): string[] {
        let t = localStorage.getItem('tags');
        if (!t) {
            t = "[]";
        }
        return JSON.parse(t);
    }
}
