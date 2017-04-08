/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VariantsTableComponent } from './variants-table.component';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';
import { AlleleFreqComponent } from '../allele-freq/allele-freq.component';
import { GenomeBrowserComponent } from '../genome-browser/genome-browser.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { GenomeBrowserResizeComponent } from '../genome-browser-resizable/genome-browser-resizable.component';
import { GeneInformationComponent } from '../gene-information/gene-information.component';
import { VariantSearchService } from '../../../services/variant-search-service';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { VsalService } from '../../../services/vsal-service';
import { MockVsalService } from '../../../mocks/vsal-service.mock';
import { EnsemblService } from '../../../services/ensembl-service';
import { OverlayMenuComponent } from '../overlay-menu/overlay-menu.component';
import { ColumnsMenuComponent } from '../columns-menu/columns-menu.component';
import { ColumnService } from '../../../services/column-service';
import { FilterAutoComponent } from '../filter-auto/filter-auto.component';
import { RegionInformationComponent } from '../region-information/region-information.component';

describe('VariantsTableComponent', () => {
    let component: VariantsTableComponent;
    let fixture: ComponentFixture<VariantsTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                Ng2PaginationModule,
                MaterialModule,
                RouterModule
            ],
            declarations: [
                AlleleFreqComponent,
                GenomeBrowserComponent,
                VariantsTableComponent,
                GenomeBrowserResizeComponent,
                GeneInformationComponent,
                RegionInformationComponent,
                OverlayMenuComponent,
                ColumnsMenuComponent,
                FilterAutoComponent
            ],
            providers: [
                {
                    provide: VariantSearchService,
                    useValue: new MockVariantSearchService()
                },
                {
                    provide: ColumnService,
                    useValue: {
                        activeColumns: (): any[] => []
                    }
                },
                {
                    provide: Router,
                    useValue: {
                        events: Observable.empty()
                    }
                },
                {
                    provide: VariantTrackService,
                    useValue: {
                        highlightedVariant: Observable.empty(),
                        clickedVariant: Observable.empty()
                    }
                },

                {
                    provide: VsalService,
                    useValue: new MockVsalService([])
                },
                {
                    provide: EnsemblService,
                    useValue: {
                        healthCheck: () => {
                            return Promise.resolve();
                        }
                    }
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VariantsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
