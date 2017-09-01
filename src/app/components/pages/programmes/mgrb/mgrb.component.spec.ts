/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PieChartComponent } from '../../../parts/charts/pie-chart.component';
import { ColumnChartComponent } from '../../../parts/charts/column-chart.component';
import { CohortListComponent } from '../../../parts/cohort-list/cohort-list.component';
import { GraphsWidgetComponent } from '../../../parts/graphs-widget/graphs-widget.component';
import { CohortCardComponent } from '../../../parts/cohort-card/cohort-card.component';
import { ProgramCardComponent } from '../../../parts/program-card/program-card.component';
import { InitiativeService } from '../../../../services/project-data/initiative-service';
import { MockInitiativeService } from '../../../../mocks/initiative.mock';
import { MgrbComponent } from './mgrb.component';
import { CohortService } from '../../../../services/project-data/cohort-service';
import { ScrollService } from '../../../../services/scroll-service';
import { Observable } from 'rxjs';
import { MdProgressBarModule, MdCheckboxModule, MaterialModule } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';
import { PcaPlotComponent } from '../../../parts/pca-plot/pca-plot.component';
import { PageContainerComponent } from '../../../parts/page-container/page-container.component';
import { HeaderNavComponent } from '../../../parts/header-nav/header-nav.component';
import { SideNavComponent } from '../../../parts/side-nav/side-nav.component';
import { PrivacyFooterComponent } from '../../../parts/privacy-footer/privacy-footer.component';
import { MockAuth } from '../../../../mocks/auth.mock';
import { Auth } from '../../../../services/auth-service';
import { MockRouter } from '../../../../mocks/router.mock';
import { MockLocationStrategy } from '../../../../mocks/locationstrategy.mock';
import { LocationStrategy } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MgrbComponent', () => {
    let component: MgrbComponent;
    let fixture: ComponentFixture<MgrbComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MdCheckboxModule,
                MdProgressBarModule,
                RouterModule,
                ChartModule,
                MaterialModule
            ],
            declarations: [
                PieChartComponent,
                ColumnChartComponent,
                CohortListComponent,
                GraphsWidgetComponent,
                CohortCardComponent,
                ProgramCardComponent,
                PcaPlotComponent,
                MgrbComponent,
                PageContainerComponent,
                PrivacyFooterComponent,
                SideNavComponent,
                HeaderNavComponent
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
                CohortService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: []
                    }
                },
                {
                    provide: InitiativeService,
                    useValue: new MockInitiativeService()
                },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MgrbComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
