import { TestBed, ComponentFixture } from '@angular/core/testing';
import { InitiativesComponent } from './initiatives.component';
import { MockInitiativeService } from '../../../mocks/initiative.mock';
import { InitiativeService } from '../../../services/project-data/initiative-service';
import { ProgramCardComponent } from '../../parts/program-card/program-card.component';
import { TotalsWidgetComponent } from '../../parts/totals-widget/totals-widget.component';
import { SearchBarComponent } from '../../parts/search-bar/search-bar.component';
import { SearchBarService } from '../../../services/search-bar-service';
import { MockSearchBarService } from '../../../mocks/search-bar-service.mock';
import { SearchOptionComponent } from '../../parts/search-option/search-option.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBarWithOptionsComponent } from '../../parts/search-bar-with-options/search-bar-with-options.component';
import { TitleLogoBannerComponent } from '../../parts/title-logo-banner/title-logo-banner.component';
import { ScrollService } from '../../../services/scroll-service';
import { HomeFooterComponent } from '../../parts/home-footer/home-footer.component';
import { HomeAboutComponent } from '../../parts/home-about/home-about.component';
import { PageContainerComponent } from '../../parts/page-container/page-container.component';
import { HeaderNavComponent } from '../../parts/header-nav/header-nav.component';
import { SideNavComponent } from '../../parts/side-nav/side-nav.component';
import { PrivacyFooterComponent } from '../../parts/privacy-footer/privacy-footer.component';
import { MockAuth } from '../../../mocks/auth.mock';
import { Auth } from '../../../services/auth-service';
import { MockRouter } from '../../../mocks/router.mock';
import { MockLocationStrategy } from '../../../mocks/locationstrategy.mock';
import { LocationStrategy } from '@angular/common';
import { ElasticGeneSearch } from '../../../services/autocomplete/elastic-gene-search-service';
import { RegionService } from '../../../services/autocomplete/region-service';
import { PositionService } from '../../../services/autocomplete/position-service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MockLocalStorageService } from '../../../mocks/local-storage.mock';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../app.material';

describe('Component: Initiatives', () => {
    let component: InitiativesComponent;
    let fixture: ComponentFixture<InitiativesComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule,
                MaterialModule
            ],
            declarations: [
                TotalsWidgetComponent,
                ProgramCardComponent,
                InitiativesComponent,
                SearchBarWithOptionsComponent,
                TitleLogoBannerComponent,
                SearchBarComponent,
                SearchOptionComponent,
                HomeFooterComponent,
                HomeAboutComponent,
                PageContainerComponent,
                PrivacyFooterComponent,
                SideNavComponent,
                HeaderNavComponent
            ],
            providers: [
                ScrollService,
                {
                    provide: LocationStrategy,
                    useValue: new MockLocationStrategy()
                },
                {
                    provide: ActivatedRoute,
                    useValue: {}
                },
                {
                    provide: Router,
                    useValue: new MockRouter()
                },
                {
                    provide: Auth,
                    useValue: new MockAuth()
                },
                {
                    provide: InitiativeService,
                    useValue: new MockInitiativeService()
                },
                {
                    provide: SearchBarService,
                    useValue: new MockSearchBarService()
                },
                {
                    provide: ElasticGeneSearch,
                    useValue: {}
                },
                {
                    provide: RegionService,
                    useValue: {}
                },
                {
                    provide: PositionService,
                    useValue: {}
                },
                {
                    provide: LocalStorageService,
                    useValue: new MockLocalStorageService()
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InitiativesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
