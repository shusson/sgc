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
                public groupFn: any = null,
                public enabled = true,
                public cap = 100) {
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
        new Chart("Avg AF", "AF", ChartType.Custom),
        new Chart("Alternate", "ALT", ChartType.Pie),
        new Chart("Reference", "c4_REF", ChartType.Pie),
        new Chart("Category", "TYPE", ChartType.Row),
        new Chart("Binned AF", "AF", ChartType.Row, (dim) => {
            return dim.group().binParams([{
                numBins: 10,
                binBounds: [0, 1],
                timeBin: false
            }]);
        }, false),
        new Chart("Chromosome", "chromosome", ChartType.Row, null, false),
        new Chart("Clinvar", "clinvar", ChartType.Row),
        new Chart("Consequences", "consequences", ChartType.Row),
        new Chart("PolyPhen", "polyPhen", ChartType.Pie, null, false),
        new Chart("Sift", "sift", ChartType.Pie, null, false),
        new Chart("Top 100 Genes", "gene", ChartType.Row, null, false, 100),
        new Chart("Eigen", "eigen", ChartType.Row, (dim) => {
            return dim.group().binParams([{
                numBins: 12,
                binBounds: [-4.2, 1.4],
                timeBin: false
            }]);
        }, false),
        new Chart("Binned Gnomad AF", "gnomadAF", ChartType.Row, (dim) => {
            return dim.group().binParams([{
                numBins: 10,
                binBounds: [0, 1],
                timeBin: false
            }]);
        }, false)];

    constructor() {
    }

    enabledCharts() {
        return this.charts.filter(c => c.enabled);
    }

    getChart(dimension: string): Chart {
        return this.charts.find((c) => c.dimension === dimension);
    }

    setChart(dimension: string, chart: any) {
        const cc = this.charts.find((c) => c.dimension === dimension);
        cc.dc = chart;
        return cc;
    }

    hasFilter(dimension: string) {
        const c = this.getChart(dimension).dc;
        return c && c.filters().length > 0;
    }

    reset(dimension: string) {
        this.getChart(dimension).dc.filterAll();
        dc.redrawAllAsync();
    }

    getFilter(tag: string): string {
        const d = localStorage.getItem(tag);
        return JSON.parse(d).allFilter;
    }
}
