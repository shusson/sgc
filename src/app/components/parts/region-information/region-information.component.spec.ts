/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '../../../app.material';

import { VariantSearchService } from '../../../services/variant-search-service';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';
import { SearchBarService } from '../../../services/search-bar-service';
import { RegionInformationComponent } from './region-information.component';
import { RegionService } from '../../../services/autocomplete/region-service';
import { Observable } from 'rxjs/Observable';

describe('RegionInformationComponent', () => {
    let component: RegionInformationComponent;
    let fixture: ComponentFixture<RegionInformationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [
                RegionInformationComponent
            ],
            providers: [
                {
                    provide: VariantSearchService,
                    useValue: new MockVariantSearchService()
                },
                {
                    provide: RegionService,
                    useValue: {
                        getGenesInRegion: () => Observable.empty()
                    }
                },
                {
                    provide: SearchBarService,
                    useValue: {}
                }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegionInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
