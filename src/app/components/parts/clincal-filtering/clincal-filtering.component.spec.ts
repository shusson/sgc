import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClincalFilteringComponent } from './clincal-filtering.component';
import { MaterialModule } from '../../../app.material';
import { FormsModule } from '@angular/forms';
import { ClinicalChartComponent } from '../clinical-chart/clinical-chart.component';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';
import { VariantSearchService } from '../../../services/variant-search-service';
import { ActivatedRoute, Router } from '@angular/router';
import { empty } from "rxjs";

describe('ClincalFilteringComponent', () => {
    let component: ClincalFilteringComponent;
    let fixture: ComponentFixture<ClincalFilteringComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MaterialModule
            ],
            declarations: [
                ClincalFilteringComponent,
                ClinicalChartComponent
            ],
            providers: [
                {
                    provide: VariantSearchService,
                    useValue: new MockVariantSearchService()
                },
                {
                    provide: VariantTrackService,
                    useValue: {}
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: empty()
                    }
                },
                {
                    provide: Router,
                    useValue: {
                        events: empty()
                    }
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClincalFilteringComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
