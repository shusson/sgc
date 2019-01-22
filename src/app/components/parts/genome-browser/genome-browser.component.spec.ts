import { TestBed, ComponentFixture } from '@angular/core/testing';
import { GenomeBrowserComponent } from './genome-browser.component';
import { VariantSearchService } from '../../../services/variant-search-service';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { TranscriptTrackService } from '../../../services/genome-browser/transcript-track-service';
import { ElasticGeneSearch } from '../../../services/autocomplete/elastic-gene-search-service';
import { EnsemblService } from '../../../services/ensembl-service';
import { MaterialModule } from '../../../app.material';
import { FormsModule } from '@angular/forms';
import { OverlayMenuComponent } from '../overlay-menu/overlay-menu.component';
import { Chromosome } from '../../../model/chromosome';
import { of } from "rxjs";

describe('Component: Genome Browser', () => {

    let component: GenomeBrowserComponent;
    let fixture: ComponentFixture<GenomeBrowserComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MaterialModule
            ],
            declarations: [
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
                    provide: ElasticGeneSearch,
                    useValue: {
                        getChromosome: () => {
                            return of<Chromosome>({name: 'X', length: 1});
                        }
                    }
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
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GenomeBrowserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
