import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter2';

export class ClinicalChart {

    constructor(public name: string,
                public type: string,
                public dim: crossfilter.Dimension,
                public min: number,
                public max: number,
                public xAxisLabel: string,
                public yAxisLabel: string,
                public enabled = false,
                public xAxisFormating = []) {
    }
}

@Component({
    selector: 'app-clincal-filtering',
    templateUrl: './clincal-filtering.component.html',
    styleUrls: ['./clincal-filtering.component.css'],
    providers: [ClinapiService]
})
export class ClincalFilteringComponent implements OnInit {

    patients = [];
    ndx: any;
    charts: ClinicalChart[];

    constructor(private cs: ClinapiService) {
    }

    ngOnInit() {
        this.cs.getPatients().subscribe(v => {
            this.patients = v;
            this.ndx = crossfilter(this.patients);
            this.cs.samplesGroup = this.ndx.dimension((d) => {
                return d.sid;
            }).group();
            const all = this.ndx.groupAll();

            this.charts = [
                new ClinicalChart(
                    'height',
                    'bar',
                    this.ndx.dimension((d) => {
                        return d.h * 100;
                    }),
                    100,
                    200,
                    'Height (cm)',
                    '# Patients',
                    true
                ),
                new ClinicalChart(
                    'weight',
                    'bar',
                    this.ndx.dimension((d) => {
                        return d.w;
                    }),
                    0,
                    300,
                    'Weight (kg)',
                    '# Patients',
                    true
                ),
                new ClinicalChart(
                    'sbp',
                    'bar',
                    this.ndx.dimension((d) => {
                        return d.sbp;
                    }),
                    0,
                    300,
                    'Systolic Blood Pressure (mmHg)',
                    '# Patients',
                    true
                ),
                new ClinicalChart(
                    'glc',
                    'bar',
                    this.ndx.dimension((d) => {
                        return d.glc;
                    }),
                    0,
                    10,
                    'Blood Glucose Level (mmol/L',
                    '# Patients'
                ),
                new ClinicalChart(
                    'gender',
                    'pie',
                    this.ndx.dimension((d) => {
                        return d.gender;
                    }),
                    1930,
                    1980,
                    'Gender',
                    ''
                ),
                new ClinicalChart(
                    'yob',
                    'bar',
                    this.ndx.dimension((d) => {
                        return d.yob;
                    }),
                    1930,
                    1980,
                    'Year of birth',
                    '# Patients',
                    false,
                    [
                        (xAxis) => {
                            xAxis.tickFormat((yob) => {
                                return yob;
                            });
                        },
                        (xAxis) => {
                            xAxis.ticks(5)
                        },
                    ]
                ),
                new ClinicalChart(
                    'circ',
                    'bar',
                    this.ndx.dimension((d) => {
                        return d.circ;
                    }),
                    0,
                    300,
                    'Waist Circumference (cm)',
                    '# Patients'
                ),

            ];

            dc.dataCount('.dc-data-count')
                .dimension(this.ndx)
                .group(all)
                .html({
                    some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records',
                    all: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records'
                });

            dc.renderAll();

        });
    }

    resetFilters() {
        dc.filterAll();
        dc.renderAll();
    }

}
