import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopFreqsComponent } from './pop-freqs.component';
import { MdTabsModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Variant } from '../../../model/variant';

describe('PopFreqsComponent', () => {
    let component: PopFreqsComponent;
    let fixture: ComponentFixture<PopFreqsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MdTabsModule,
                NgxDatatableModule
            ],
            declarations: [PopFreqsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopFreqsComponent);
        component = fixture.componentInstance;
        component.variant = new Variant();
        component.variant.annotation = <any>{populationFrequencies: []};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
