/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcaPlotComponent } from './pca-plot.component';
import { ChartModule } from 'angular2-highcharts';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('PcaPlotComponent', () => {
    let component: PcaPlotComponent;
    let fixture: ComponentFixture<PcaPlotComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ChartModule],
            declarations: [PcaPlotComponent],
            providers: [
                    {
                        provide: HttpClient,
                        useValue: {
                            get: () => Observable.empty()
                        }
                    }
                ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PcaPlotComponent);
        component = fixture.componentInstance;
        component.options = {};
        component.axis = ['', ''];
        component.title = '';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
