import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrbDownloadComponent } from './mgrb-download.component';
import { PageContainerComponent } from '../../parts/page-container/page-container.component';
import { PrivacyFooterComponent } from '../../parts/privacy-footer/privacy-footer.component';
import { SideNavComponent } from '../../parts/side-nav/side-nav.component';
import { HeaderNavComponent } from '../../parts/header-nav/header-nav.component';
import { DurlService } from '../../../services/durl.service';
import { Observable } from 'rxjs/Observable';
import { MockRouter } from '../../../mocks/router.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';
import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '../../../mocks/locationstrategy.mock';
import { Auth } from '../../../services/auth-service';
import { MockAuth } from '../../../mocks/auth.mock';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MockLocalStorageService } from '../../../mocks/local-storage.mock';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../app.material';

describe('MgrbDownloadComponent', () => {
    let component: MgrbDownloadComponent;
    let fixture: ComponentFixture<MgrbDownloadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MaterialModule
            ],
            declarations: [
                MgrbDownloadComponent,
                PageContainerComponent,
                PrivacyFooterComponent,
                SideNavComponent,
                HeaderNavComponent
            ],
            providers: [
                {
                    provide: Router,
                    useValue: new MockRouter()
                },
                {
                    provide: DurlService,
                    useValue: {
                        getDownloadUrl: () => Observable.empty()
                    }
                },
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
                    provide: LocalStorageService,
                    useValue: new MockLocalStorageService()
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MgrbDownloadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
