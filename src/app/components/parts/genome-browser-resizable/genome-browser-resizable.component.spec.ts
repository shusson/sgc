import { TestBed, ComponentFixture } from '@angular/core/testing';
import { VariantSearchService } from '../../../services/variant-search-service';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { TranscriptTrackService } from '../../../services/genome-browser/transcript-track-service';
import { GenomeBrowserResizeComponent } from './genome-browser-resizable.component';
import { GenomeBrowserComponent } from '../genome-browser/genome-browser.component';
import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { ScrollService } from '../../../services/scroll-service';
import { EnsemblService } from '../../../services/ensembl-service';
import { ElasticGeneSearch } from '../../../services/autocomplete/elastic-gene-search-service';
import { MaterialModule } from '../../../app.material';
import { FormsModule } from '@angular/forms';
import { OverlayMenuComponent } from '../overlay-menu/overlay-menu.component';
import { empty } from "rxjs";

describe('Component: Genome Browser', () => {

    let component: GenomeBrowserResizeComponent;
    let fixture: ComponentFixture<GenomeBrowserResizeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MaterialModule
            ],
            declarations: [
                GenomeBrowserResizeComponent,
                GenomeBrowserComponent,
                OverlayMenuComponent
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
                    provide: TranscriptTrackService,
                    useValue: {}
                },
                {
                    provide: ElementRef,
                    useValue: {}
                },
                {
                    provide: EnsemblService,
                    useValue: {
                        healthCheck: () => Promise.resolve()
                    }
                },
                {
                    provide: ElasticGeneSearch,
                    useValue: {
                        getChromosome: () => empty()
                    }
                },
                {
                    provide: ChangeDetectorRef,
                    useValue: {
                        detectChanges: () => {
                        }
                    }
                },
                ScrollService
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GenomeBrowserResizeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
