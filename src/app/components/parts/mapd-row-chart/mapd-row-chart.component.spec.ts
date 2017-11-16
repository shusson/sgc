import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../app.material';

import { MapdRowChartComponent } from './mapd-row-chart.component';
import { MatTooltipModule } from '@angular/material';
import { ChartsService } from '../../../services/charts.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { CfMock } from '../../../mocks/cf.mock';
import { ChartServiceMock } from '../../../mocks/chart-service.mock';

describe('MapdRowChartComponent', () => {
    let component: MapdRowChartComponent;
    let fixture: ComponentFixture<MapdRowChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [MapdRowChartComponent],
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
        fixture = TestBed.createComponent(MapdRowChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
