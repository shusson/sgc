import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsequencesComponent } from './consequences.component';
import { Variant } from '../../../model/variant';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('ConsequencesComponent', () => {
    let component: ConsequencesComponent;
    let fixture: ComponentFixture<ConsequencesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxDatatableModule
            ],
            declarations: [ConsequencesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConsequencesComponent);
        component = fixture.componentInstance;
        component.variant = new Variant();
        component.variant.annotation = <any>{consequenceTypes: []};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
