import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';
import { VariantSearchService } from '../../../services/variant-search-service';
import { GenomeBrowserComponent } from '../genome-browser/genome-browser.component';
import { AlleleFreqComponent } from '../allele-freq/allele-freq.component';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { Observable } from 'rxjs';
import { GenomeBrowserResizeComponent } from '../genome-browser-resizable/genome-browser-resizable.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FormsModule } from '@angular/forms';
import { SearchBarService } from '../../../services/search-bar-service';
import { RegionService } from '../../../services/autocomplete/region-service';
import { ScrollService } from '../../../services/scroll-service';
import { GeneInformationComponent } from '../gene-information/gene-information.component';
import { VsalService } from '../../../services/vsal-service';
import { MockVsalService } from '../../../mocks/vsal-service.mock';
import { Router, RouterModule } from '@angular/router';
import { EnsemblService } from '../../../services/ensembl-service';
import { MaterialModule } from '@angular/material';
import { SearchResultsComponent } from './search-results.component';
import { VariantsTableComponent } from '../variants-table/variants-table.component';
import { OverlayMenuComponent } from '../overlay-menu/overlay-menu.component';
import { ColumnsMenuComponent } from '../columns-menu/columns-menu.component';
import { ColumnService } from '../../../services/column-service';
import { FilterAutoComponent } from '../filter-auto/filter-auto.component';
import { RegionInformationComponent } from '../region-information/region-information.component';
import { SearchFilterSelectComponent } from '../search-filter-select/search-filter-select.component';
import { SearchFilterParametersComponent } from '../search-filter-parameters/search-filter-parameters.component';
import { SearchFilterItemComponent } from '../search-filter-item/search-filter-item.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

describe('Component: SearchResults', () => {

    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;

    beforeEach(() => {
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
                SearchResultsComponent,
                VariantsTableComponent,
                GenomeBrowserResizeComponent,
                GeneInformationComponent,
                RegionInformationComponent
                OverlayMenuComponent,
                ColumnsMenuComponent,
                FilterAutoComponent,
                SearchFilterComponent,
                SearchFilterItemComponent,
                SearchFilterParametersComponent,
                SearchFilterSelectComponent

            ],
            providers: [
                {
                    provide: VariantSearchService,
                    useValue: new MockVariantSearchService()
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
                    provide: SearchBarService,
                    useValue: {}
                },
                {
                    provide: ColumnService,
                    useValue: {
                        activeColumns: (): any[] => []
                    }
                },
                {
                    provide: RegionService,
                    useValue: {}
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
                ScrollService,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        component.autocomplete = <any>{search: () => Promise.resolve('')};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
