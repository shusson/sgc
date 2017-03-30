import { TotalsWidgetComponent } from './totals-widget.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('Component: TotalsWidget', () => {

    let component: TotalsWidgetComponent;
    let fixture: ComponentFixture<TotalsWidgetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                TotalsWidgetComponent
            ],
            providers: [

            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TotalsWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
