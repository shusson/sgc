/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrivacyFooterComponent } from './privacy-footer.component';

describe('PrivacyFooterComponent', () => {
    let component: PrivacyFooterComponent;
    let fixture: ComponentFixture<PrivacyFooterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrivacyFooterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrivacyFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
