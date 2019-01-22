import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';
import { VariantSearchService } from '../../../services/variant-search-service';
import { GenomeBrowserComponent } from '../genome-browser/genome-browser.component';
import { AlleleFreqComponent } from '../allele-freq/allele-freq.component';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { GenomeBrowserResizeComponent } from '../genome-browser-resizable/genome-browser-resizable.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchBarService } from '../../../services/search-bar-service';
import { RegionService } from '../../../services/autocomplete/region-service';
import { ScrollService } from '../../../services/scroll-service';
import { GeneInformationComponent } from '../gene-information/gene-information.component';
import { VsalService } from '../../../services/vsal-service';
import { MockVsalService } from '../../../mocks/vsal-service.mock';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EnsemblService } from '../../../services/ensembl-service';
import { MaterialModule } from '../../../app.material';
import { SearchResultsComponent } from './search-results.component';
import { VariantsTableComponent } from '../variants-table/variants-table.component';
import { OverlayMenuComponent } from '../overlay-menu/overlay-menu.component';
import { TableService } from '../../../services/table-service';
import { FilterAutoComponent } from '../filter-auto/filter-auto.component';
import { RegionInformationComponent } from '../region-information/region-information.component';
import { ClincalFilteringComponent } from '../clincal-filtering/clincal-filtering.component';
import { ClinicalChartComponent } from '../clinical-chart/clinical-chart.component';
import { empty } from "rxjs";

describe('Component: SearchResults', () => {

    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;

    beforeEach(() => {
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
                {
                    provide: VariantTrackService,
                    useValue: {
                        highlightedVariant: empty(),
                        clickedVariant: empty()
                    }
                },
                {
                    provide: SearchBarService,
                    useValue: {}
                },
                {
                    provide: TableService,
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
