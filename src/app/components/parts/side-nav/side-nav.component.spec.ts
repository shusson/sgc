/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '../../../app.material';

import { SideNavComponent } from './side-nav.component';
import { ScrollService } from '../../../services/scroll-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Auth } from '../../../services/auth-service';

describe('SideNavComponent', () => {
    let component: SideNavComponent;
    let fixture: ComponentFixture<SideNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [
                SideNavComponent
            ],
            providers: [
                {
                    provide: Router,
                    useValue: {
                        events: Observable.empty()
                    }
                },
                {
                    provide: Auth,
                    useValue: {
                        authenticated: () => {
                        }
                    }
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
