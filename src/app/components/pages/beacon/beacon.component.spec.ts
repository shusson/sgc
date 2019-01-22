import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BeaconComponent } from './beacon.component';
import { BeaconSearchService } from '../../../services/beacon/beacon-search-service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageContainerComponent } from '../../parts/page-container/page-container.component';
import { MaterialModule } from '../../../app.material';
import { HeaderNavComponent } from '../../parts/header-nav/header-nav.component';
import { SideNavComponent } from '../../parts/side-nav/side-nav.component';
import { PrivacyFooterComponent } from '../../parts/privacy-footer/privacy-footer.component';
import { MockAuth } from '../../../mocks/auth.mock';
import { Auth } from '../../../services/auth-service';
import { MockRouter } from '../../../mocks/router.mock';
import { MockLocationStrategy } from '../../../mocks/locationstrategy.mock';
import { LocationStrategy } from '@angular/common';
import { ScrollService } from '../../../services/scroll-service';
import { BeaconTableComponent } from '../../parts/beacon-table/beacon-table.component';
import { BeaconNetworkService } from '../../../services/beacon/beacon-network-service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { empty } from "rxjs";

describe('BeaconComponent', () => {

    let component: BeaconComponent;
    let fixture: ComponentFixture<BeaconComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule,
                NgxPaginationModule,
                MaterialModule,
                NgxDatatableModule,
            ],
            declarations: [
                BeaconComponent,
                PageContainerComponent,
                PrivacyFooterComponent,
                SideNavComponent,
                HeaderNavComponent,
                BeaconTableComponent
            ],
            providers: [
                ScrollService,
                {
                    provide: LocationStrategy,
                    useValue: new MockLocationStrategy()
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
                    provide: BeaconSearchService,
                    useValue: {
                        errors: empty()
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: empty()
                    }
                },
                {
                    provide: BeaconNetworkService,
                    useValue: {}
                },
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BeaconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
