import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAutoComponent } from './filter-auto.component';
import { ColumnService } from '../../../services/column-service';
import { FormsModule } from '@angular/forms';

describe('FilterAutoComponent', () => {
    let component: FilterAutoComponent;
    let fixture: ComponentFixture<FilterAutoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [FilterAutoComponent],
            providers: [
                {
                    provide: ColumnService,
                    useValue: {
                        activeColumns: (): any[] => []
                    }
                },
                {
                    provide: FilterAutoComponent,
                    useValue: {}
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterAutoComponent);
        component = fixture.componentInstance;
        component.variants = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
