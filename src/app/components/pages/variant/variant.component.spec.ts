import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantComponent } from './variant.component';
import { MockAuth } from '../../../mocks/auth.mock';
import { Auth } from '../../../services/auth-service';
import { MockRouter } from '../../../mocks/router.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { MockLocationStrategy } from '../../../mocks/locationstrategy.mock';
import { LocationStrategy } from '@angular/common';
import { ScrollService } from '../../../services/scroll-service';
import { HeaderNavComponent } from '../../parts/header-nav/header-nav.component';
import { SideNavComponent } from '../../parts/side-nav/side-nav.component';
import { PrivacyFooterComponent } from '../../parts/privacy-footer/privacy-footer.component';
import { PageContainerComponent } from '../../parts/page-container/page-container.component';
import { MgrbTermsComponent } from '../mgrb-terms/mgrb-terms.component';
import { BeaconTableComponent } from '../../parts/beacon-table/beacon-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { VsalService } from '../../../services/vsal-service';
import { MockVsalService } from '../../../mocks/vsal-service.mock';
import { BeaconNetworkService } from '../../../services/beacon/beacon-network-service';
import { RegionService } from '../../../services/autocomplete/region-service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../app.material';
import { empty } from "rxjs";

describe('VariantComponent', () => {
    let component: VariantComponent;
    let fixture: ComponentFixture<VariantComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MaterialModule,
                NgxPaginationModule,
                FormsModule,
                NgxDatatableModule
            ],
            declarations: [
                VariantComponent,
                MgrbTermsComponent,
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
                    provide: ActivatedRoute,
                    useValue: {
                        params: empty()
                    }
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
                    provide: VsalService,
                    useValue: new MockVsalService([])
                },
                {
                    provide: BeaconNetworkService,
                    useValue: {}
                },
                {
                    provide: RegionService,
                    useValue: {}
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VariantComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
