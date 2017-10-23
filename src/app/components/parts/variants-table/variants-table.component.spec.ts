/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

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
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { VsalService } from '../../../services/vsal-service';
import { MockVsalService } from '../../../mocks/vsal-service.mock';
import { EnsemblService } from '../../../services/ensembl-service';
import { OverlayMenuComponent } from '../overlay-menu/overlay-menu.component';
import { ColumnsMenuComponent } from '../columns-menu/columns-menu.component';
import { TableService } from '../../../services/table-service';
import { FilterAutoComponent } from '../filter-auto/filter-auto.component';
import { RegionInformationComponent } from '../region-information/region-information.component';
import { ClincalFilteringComponent, ClinicalChart } from '../clincal-filtering/clincal-filtering.component';
import { ClinicalChartComponent } from '../clinical-chart/clinical-chart.component';

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
                ColumnsMenuComponent,
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
