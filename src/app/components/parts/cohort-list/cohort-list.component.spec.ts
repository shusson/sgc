import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CohortListComponent } from './cohort-list.component';
import { CohortService } from '../../../services/project-data/cohort-service';
import { MockCohortService } from '../../../mocks/cohort.mock';
import { MatCheckboxModule } from '@angular/material';

describe('Component: CohortList', () => {

    let component: CohortListComponent;
    let fixture: ComponentFixture<CohortListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCheckboxModule
            ],
            declarations: [
                CohortListComponent
            ],
            providers: [
                {
                    provide: CohortService,
                    useValue: new MockCohortService()
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CohortListComponent);
        component = fixture.componentInstance;
        component.cohortIds = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
