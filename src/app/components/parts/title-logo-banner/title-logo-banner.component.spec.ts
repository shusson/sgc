/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TitleLogoBannerComponent } from './title-logo-banner.component';

describe('TitleLogoBannerComponent', () => {
    let component: TitleLogoBannerComponent;
    let fixture: ComponentFixture<TitleLogoBannerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TitleLogoBannerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TitleLogoBannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
