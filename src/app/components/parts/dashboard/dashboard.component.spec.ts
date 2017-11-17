import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpIconComponent } from '../help-icon/help-icon.component';

import { DashboardComponent } from './dashboard.component';
import { SearchBarWithOptionsComponent } from '../search-bar-with-options/search-bar-with-options.component';
import { VariantsTablePaginatedComponent } from '../variants-table-paginated/variants-table-paginated.component';
import { SearchBarService } from '../../../services/search-bar-service';
import { MockSearchBarService } from '../../../mocks/search-bar-service.mock';
import { MapdService } from '../../../services/mapd.service';
import { MapdMock } from '../../../mocks/mapd.mock';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { CfMock } from '../../../mocks/cf.mock';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchOptionComponent } from '../search-option/search-option.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ElasticGeneSearch } from '../../../services/autocomplete/elastic-gene-search-service';
import { RegionService } from '../../../services/autocomplete/region-service';
import { PositionService } from '../../../services/autocomplete/position-service';
import { MockRouter } from '../../../mocks/router.mock';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../app.material';
import { MapdRowChartComponent } from '../mapd-row-chart/mapd-row-chart.component';
import { MapdPieChartComponent } from '../mapd-pie-chart/mapd-pie-chart.component';
import { MapdAvgAfChartComponent } from '../mapd-avg-af-chart/mapd-avg-af-chart.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule,
                MaterialModule,
                NgxDatatableModule
            ],
            declarations: [
                DashboardComponent,
                SearchBarWithOptionsComponent,
                VariantsTablePaginatedComponent,
                SearchBarComponent,
                SearchOptionComponent,
                MapdRowChartComponent,
                MapdPieChartComponent,
                MapdAvgAfChartComponent,
                HelpIconComponent
            ],
            providers: [
                {
                    provide: SearchBarService,
                    useValue: new MockSearchBarService()
                },
                {
                    provide: MapdService,
                    useValue: new MapdMock()
                },
                {
                    provide: CrossfilterService,
                    useValue: new CfMock()
                },
                {
                    provide: ElasticGeneSearch,
                    useValue: {}
                },
                {
                    provide: RegionService,
                    useValue: {}
                },
                {
                    provide: PositionService,
                    useValue: {}
                },
                {
                    provide: Router,
                    useValue: new MockRouter()
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
