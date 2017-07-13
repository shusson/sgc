import { Injectable } from '@angular/core';

import '@mapd/mapdc/dist/mapdc.js';

export class Chart {
    dc: any;
    constructor(public name: string = "") {
    }
}

class SerializedChart {
    name = "";
    filters: string[] = [];
}

@Injectable()
export class ChartsService {
    charts = [new Chart("alt"),
        new Chart("ref"),
        new Chart("type"),
        new Chart("afAvg"),
        new Chart("afCount"),
        new Chart("range"),
        new Chart("chrom"),
        new Chart("rsid")];

    constructor() {
    }

    names() {
        return this.charts.map((c) => c.name);
    }

    getChart(name: string): Chart {
        return this.charts.find((c) => c.name == name);
    }

    setChart(name: string, chart: any) {
        const c = this.charts.find((c) => c.name == name);
        c.dc = chart;
        return c;
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
