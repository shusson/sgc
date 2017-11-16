import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../app.material';

import { MapdPieChartComponent } from './mapd-pie-chart.component';
import { MatTooltipModule } from '@angular/material';
import { CohortService } from '../../../services/project-data/cohort-service';
import { MockCohortService } from '../../../mocks/cohort.mock';
import { ChartsService } from '../../../services/charts.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { CfMock } from '../../../mocks/cf.mock';
import { ChartServiceMock } from '../../../mocks/chart-service.mock';

describe('MapdPieChartComponent', () => {
    let component: MapdPieChartComponent;
    let fixture: ComponentFixture<MapdPieChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [MapdPieChartComponent],
            providers: [
                {
                    provide: ChartsService,
                    useValue: new ChartServiceMock()
                },
                {
                    provide: CrossfilterService,
                    useValue: new CfMock()
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapdPieChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
