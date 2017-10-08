/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OverlayMenuComponent } from './overlay-menu.component';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { MaterialModule } from '../../../app.material';

describe('OverlayMenuComponent', () => {
    let component: OverlayMenuComponent;
    let fixture: ComponentFixture<OverlayMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [OverlayMenuComponent],
            providers: [
                {
                    provide: VariantTrackService,
                    useValue: {}
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OverlayMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
