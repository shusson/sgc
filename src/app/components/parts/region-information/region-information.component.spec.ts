/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantSearchService } from '../../../services/variant-search-service';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';
import { SearchBarService } from '../../../services/search-bar-service';
import { RegionInformationComponent } from './region-information.component';
import { RegionService } from '../../../services/autocomplete/region-service';
import { empty } from "rxjs";

describe('RegionInformationComponent', () => {
    let component: RegionInformationComponent;
    let fixture: ComponentFixture<RegionInformationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
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
                        getGenesInRegion: () => empty()
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
