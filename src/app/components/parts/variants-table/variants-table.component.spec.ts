/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantsTableComponent } from './variants-table.component';
import { MaterialModule } from '../../../app.material';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlleleFreqComponent } from '../allele-freq/allele-freq.component';
import { GenomeBrowserComponent } from '../genome-browser/genome-browser.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { GenomeBrowserResizeComponent } from '../genome-browser-resizable/genome-browser-resizable.component';
import { GeneInformationComponent } from '../gene-information/gene-information.component';
import { VariantSearchService } from '../../../services/variant-search-service';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';
import { Router, RouterModule } from '@angular/router';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { VsalService } from '../../../services/vsal-service';
import { MockVsalService } from '../../../mocks/vsal-service.mock';
import { OverlayMenuComponent } from '../overlay-menu/overlay-menu.component';
import { TableService } from '../../../services/table-service';
import { FilterAutoComponent } from '../filter-auto/filter-auto.component';
import { RegionInformationComponent } from '../region-information/region-information.component';
import { ClincalFilteringComponent } from '../clincal-filtering/clincal-filtering.component';
import { ClinicalChartComponent } from '../clinical-chart/clinical-chart.component';
import { empty } from "rxjs";

describe('VariantsTableComponent', () => {
    let component: VariantsTableComponent;
    let fixture: ComponentFixture<VariantsTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                NgxPaginationModule,
                MaterialModule,
                RouterModule
            ],
            declarations: [
                AlleleFreqComponent,
                GenomeBrowserComponent,
                SearchResultsComponent,
                VariantsTableComponent,
                GenomeBrowserResizeComponent,
                GeneInformationComponent,
                RegionInformationComponent,
                OverlayMenuComponent,
                FilterAutoComponent,
                ClincalFilteringComponent,
                ClinicalChartComponent
            ],
            providers: [
                {
                    provide: VariantSearchService,
                    useValue: new MockVariantSearchService()
                },
                {
                    provide: TableService,
                    useValue: {
                        activeColumns: (): any[] => [],
                        sortMap: {},
                        keys: () => []
                    }
                },
                {
                    provide: Router,
                    useValue: {
                        events: empty()
                    }
                },
                {
                    provide: VariantTrackService,
                    useValue: {
                        highlightedVariant: empty(),
                        clickedVariant: empty()
                    }
                },

                {
                    provide: VsalService,
                    useValue: new MockVsalService([])
                }
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
