/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderNavComponent } from './header-nav.component';
import { ScrollService } from '../../../services/scroll-service';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth-service';
import { Observable } from 'rxjs';

describe('HeaderNavComponent', () => {
    let component: HeaderNavComponent;
    let fixture: ComponentFixture<HeaderNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                HeaderNavComponent
            ],
            providers: [
                ScrollService,
                {
                    provide: Router,
                    useValue: {
                        events: Observable.empty()
                    }
                },
                {
                    provide: Auth,
                    useValue: {
                        authenticated: () => {}
                    }
                },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
