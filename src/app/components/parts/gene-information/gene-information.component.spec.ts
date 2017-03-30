/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GeneInformationComponent } from './gene-information.component';
import { VariantSearchService } from '../../../services/variant-search-service';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';
import { SearchBarService } from '../../../services/search-bar-service';

describe('GeneInformationComponent', () => {
    let component: GeneInformationComponent;
    let fixture: ComponentFixture<GeneInformationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [
                GeneInformationComponent
            ],
            providers: [
                {
                    provide: VariantSearchService,
                    useValue: new MockVariantSearchService()
                },
                {
                    provide: SearchBarService,
                    useValue: {}
                }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeneInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
