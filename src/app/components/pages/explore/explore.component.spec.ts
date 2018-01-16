import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthGuardComponent } from '../../parts/auth-guard/auth-guard.component';
import { HelpIconComponent } from '../../parts/help-icon/help-icon.component';

import { ExploreComponent } from './explore.component';
import { DashboardComponent } from '../../parts/dashboard/dashboard.component';
import { PageContainerComponent } from '../../parts/page-container/page-container.component';
import { PrivacyFooterComponent } from '../../parts/privacy-footer/privacy-footer.component';
import { SideNavComponent } from '../../parts/side-nav/side-nav.component';
import { HeaderNavComponent } from '../../parts/header-nav/header-nav.component';
import { ScrollService } from '../../../services/scroll-service';
import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockRouter } from '../../../mocks/router.mock';
import { Auth } from '../../../services/auth-service';
import { MockAuth } from '../../../mocks/auth.mock';
import { SearchBarWithOptionsComponent } from '../../parts/search-bar-with-options/search-bar-with-options.component';
import { VariantsTablePaginatedComponent } from '../../parts/variants-table-paginated/variants-table-paginated.component';
import { SearchBarComponent } from '../../parts/search-bar/search-bar.component';
import { SearchOptionComponent } from '../../parts/search-option/search-option.component';
import { SearchBarService } from '../../../services/search-bar-service';
import { MockSearchBarService } from '../../../mocks/search-bar-service.mock';
import { MapdService } from '../../../services/mapd.service';
import { MapdMock } from '../../../mocks/mapd.mock';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { CfMock } from '../../../mocks/cf.mock';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../app.material';
import { MapdPieChartComponent } from '../../parts/mapd-pie-chart/mapd-pie-chart.component';
import { MapdAvgAfChartComponent } from '../../parts/mapd-avg-af-chart/mapd-avg-af-chart.component';
import { MapdRowChartComponent } from '../../parts/mapd-row-chart/mapd-row-chart.component';

describe('ExploreComponent', () => {
    let component: ExploreComponent;
    let fixture: ComponentFixture<ExploreComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule,
                MaterialModule,
                NgxDatatableModule
            ],
            declarations: [
                ExploreComponent,
                DashboardComponent,
                PageContainerComponent,
                PrivacyFooterComponent,
                SideNavComponent,
                HeaderNavComponent,
                SearchBarWithOptionsComponent,
                VariantsTablePaginatedComponent,
                SearchBarComponent,
                SearchOptionComponent,
                MapdRowChartComponent,
                MapdPieChartComponent,
                MapdAvgAfChartComponent,
                HelpIconComponent,
                AuthGuardComponent
            ],
            providers: [
                ScrollService,
                {
                    provide: LocationStrategy,
                    useValue: new MockLocationStrategy()
                },
                {
                    provide: ActivatedRoute,
                    useValue: {}
                },
                {
                    provide: Router,
                    useValue: new MockRouter()
                },
                {
                    provide: Auth,
                    useValue: new MockAuth()
                },
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
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExploreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
