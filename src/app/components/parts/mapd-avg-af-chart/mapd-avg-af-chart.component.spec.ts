import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../app.material';

import { MapdAvgAfChartComponent } from './mapd-avg-af-chart.component';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { CfMock } from '../../../mocks/cf.mock';

describe('MapdAvgAfChartComponent', () => {
    let component: MapdAvgAfChartComponent;
    let fixture: ComponentFixture<MapdAvgAfChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [MapdAvgAfChartComponent],
            providers: [
                {
                    provide: CrossfilterService,
                    useValue: new CfMock()
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapdAvgAfChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
