import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BeaconComponent } from './beacon.component';
import { BeaconSearchService } from '../../../services/beacon/beacon-search-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Ng2PaginationModule } from 'ng2-pagination';
import { PageContainerComponent } from '../../parts/page-container/page-container.component';
import { MaterialModule } from '@angular/material';
import { HeaderNavComponent } from '../../parts/header-nav/header-nav.component';
import { SideNavComponent } from '../../parts/side-nav/side-nav.component';
import { PrivacyFooterComponent } from '../../parts/privacy-footer/privacy-footer.component';
import { MockAuth } from '../../../mocks/auth.mock';
import { Auth } from '../../../services/auth-service';
import { MockRouter } from '../../../mocks/router.mock';
import { MockLocationStrategy } from '../../../mocks/locationstrategy.mock';
import { LocationStrategy } from '@angular/common';
import { ScrollService } from '../../../services/scroll-service';

describe('BeaconComponent', () => {

    let component: BeaconComponent;
    let fixture: ComponentFixture<BeaconComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                Ng2PaginationModule,
                MaterialModule
            ],
            declarations: [
                BeaconComponent,
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
                        errors: Observable.empty()
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.empty()
                    }
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
