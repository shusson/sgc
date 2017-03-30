/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AlleleFreqComponent } from './allele-freq.component';

describe('Component: AlleleFreq', () => {

    let component: AlleleFreqComponent;
    let fixture: ComponentFixture<AlleleFreqComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [
                AlleleFreqComponent,
            ],
            providers: [
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlleleFreqComponent);
        component = fixture.componentInstance;
        component.freq = 0.5;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
