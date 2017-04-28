import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoresComponent } from './scores.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Variant } from '../../../model/variant';

describe('ScoresComponent', () => {
    let component: ScoresComponent;
    let fixture: ComponentFixture<ScoresComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxDatatableModule
            ],
            declarations: [ScoresComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScoresComponent);
        component = fixture.componentInstance;
        component.variant = new Variant();
        component.variant.annotation = <any>{functionalScore: [], conservation: []};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
