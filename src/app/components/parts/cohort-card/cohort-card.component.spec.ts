import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CohortCardComponent } from './cohort-card.component';
import { CohortService } from '../../../services/project-data/cohort-service';
import { MockCohortService } from '../../../mocks/cohort.mock';

describe('Component: CohortCard', () => {

    let component: CohortCardComponent;
    let fixture: ComponentFixture<CohortCardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CohortCardComponent,
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
        fixture = TestBed.createComponent(CohortCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
