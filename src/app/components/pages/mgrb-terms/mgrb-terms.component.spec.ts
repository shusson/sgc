/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MgrbTermsComponent } from './mgrb-terms.component';
import { PageContainerComponent } from '../../parts/page-container/page-container.component';
import { MaterialModule } from '../../../app.material';
import { HeaderNavComponent } from '../../parts/header-nav/header-nav.component';
import { SideNavComponent } from '../../parts/side-nav/side-nav.component';
import { PrivacyFooterComponent } from '../../parts/privacy-footer/privacy-footer.component';
import { ScrollService } from '../../../services/scroll-service';
import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '../../../mocks/locationstrategy.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { MockRouter } from '../../../mocks/router.mock';
import { Auth } from '../../../services/auth-service';
import { MockAuth } from '../../../mocks/auth.mock';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MgrbTermsComponent', () => {
    let component: MgrbTermsComponent;
    let fixture: ComponentFixture<MgrbTermsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MaterialModule
            ],
            declarations: [
                MgrbTermsComponent,
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
        fixture = TestBed.createComponent(MgrbTermsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
