import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContainerComponent } from './page-container.component';
import { PrivacyFooterComponent } from '../privacy-footer/privacy-footer.component';
import { MaterialModule } from '../../../app.material';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';
import { Auth } from '../../../services/auth-service';
import { LocationStrategy } from '@angular/common';
import { MockAuth } from '../../../mocks/auth.mock';
import { MockLocationStrategy } from '../../../mocks/locationstrategy.mock';
import { MockRouter } from '../../../mocks/router.mock';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PageContainerComponent', () => {
    let component: PageContainerComponent;
    let fixture: ComponentFixture<PageContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MaterialModule
            ],
            declarations: [
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
                    provide: Auth,
                    useValue: new MockAuth()
                }
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
