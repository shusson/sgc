import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClinicalChartComponent } from './clinical-chart.component';
import { ClinapiService } from '../../../services/clinapi.service';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';
import { VariantSearchService } from '../../../services/variant-search-service';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { ClinicalChart } from '../clincal-filtering/clincal-filtering.component';
import * as crossfilter from 'crossfilter2';

describe('ClinicalChartComponent', () => {
    let component: ClinicalChartComponent;
    let fixture: ComponentFixture<ClinicalChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClinicalChartComponent],
            providers: [
                ClinapiService,
                {
                    provide: VariantSearchService,
                    useValue: new MockVariantSearchService()
                },
                {
                    provide: VariantTrackService,
                    useValue: {}
                },

            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClinicalChartComponent);
        component = fixture.componentInstance;
        const ndx = crossfilter([]);
        component.data = new ClinicalChart(
            'circ',
            'bar',
            ndx.dimension((d) => {
                return d;
            }),
            0,
            300,
            'Waist Circumference (cm)',
            '# Patients'
        );
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
