import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { PageContainerComponent } from '../../parts/page-container/page-container.component';
import { ScrollService } from '../../../services/scroll-service';
import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '../../../mocks/locationstrategy.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { MockRouter } from '../../../mocks/router.mock';
import { Auth } from '../../../services/auth-service';
import { MockAuth } from '../../../mocks/auth.mock';
import { PrivacyFooterComponent } from '../../parts/privacy-footer/privacy-footer.component';
import { SideNavComponent } from '../../parts/side-nav/side-nav.component';
import { HeaderNavComponent } from '../../parts/header-nav/header-nav.component';
import { MaterialModule } from '../../../app.material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MaterialModule
            ],
            declarations: [
                ErrorComponent,
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
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
