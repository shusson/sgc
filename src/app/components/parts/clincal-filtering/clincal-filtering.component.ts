import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter2';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

export class ClinicalChart {

    constructor(public name: string,
                public type: string,
                public dim: crossfilter.Dimension<any, any>,
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
    providers: [ClinapiService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClincalFilteringComponent implements AfterViewInit, OnDestroy {

    error: any;
    denied = false;
    patients = [];
    ndx: any;
    charts: ClinicalChart[];
    subscriptions: Subscription[] = [];
    demo = false;
    params: any;

    constructor(private cs: ClinapiService,
                private cd: ChangeDetectorRef,
                private router: Router,
                private route: ActivatedRoute) {

        this.subscriptions.push(route.params.subscribe(p => {
            this.params = p;
            this.demo = p['demo'] === 'true';
        }));
    }

    ngAfterViewInit() {
        this.cs.getPatients(this.demo).subscribe(v => {
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
                    'Blood Glucose Level (mmol/L)',
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
                .group(all);

            dc.renderAll();

            this.cd.detectChanges();

        },
        e => {
            if (e.status && e.status === 401) {
                this.denied = true;
            } else {
                this.error = e;
            }
            this.cd.detectChanges();
        });
    }

    resetFilters() {
        dc.filterAll();
        dc.renderAll();
    }

    viewDemo() {
        const o = {timestamp: Date.now(), demo: true, query: this.params['query']};
        this.router.navigate(['/search/results', o]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s => s.unsubscribe()));
    }

}
