import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { GraphsWidgetComponent } from './graphs-widget.component';
import { MockCohortService } from '../../../mocks/cohort.mock';
import { CohortService } from '../../../services/project-data/cohort-service';
import { MockInitiativeService } from '../../../mocks/initiative.mock';
import { InitiativeService } from '../../../services/project-data/initiative-service';
import { CohortListComponent } from '../cohort-list/cohort-list.component';
import { ColumnChartComponent } from '../charts/column-chart.component';
import { PieChartComponent } from '../charts/pie-chart.component';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../app.material';
import { Initiative } from '../../../model/initiative';
import { QueryList } from '@angular/core';

describe('Component: GraphsWidget', () => {
    let component: GraphsWidgetComponent;
    let fixture: ComponentFixture<GraphsWidgetComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [
                ColumnChartComponent,
                PieChartComponent,
                GraphsWidgetComponent,
                CohortListComponent,
            ],
            providers: [
                {
                    provide: CohortService,
                    useValue: new MockCohortService()
                },
                {
                    provide: InitiativeService,
                    useValue: new MockInitiativeService()
                },
                {
                    provide: Router,
                    useClass: {}
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        let list = TestBed.createComponent(CohortListComponent);
        list.componentInstance.cohortIds = [];
        fixture = TestBed.createComponent(GraphsWidgetComponent);
        component = fixture.componentInstance;
        component.initiative = new Initiative();
        component.initiative.ages = [];
        component.initiative.heights = [];
        component.initiative.weights = [];
        component.initiative.sex = [];
        component.cohortList = list.componentInstance;
        component.simpleCharts = new QueryList<ColumnChartComponent>();
        component.pieCharts = new QueryList<PieChartComponent>();
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });

});
