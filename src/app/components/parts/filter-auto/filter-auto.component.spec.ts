import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAutoComponent } from './filter-auto.component';
import { TableService } from '../../../services/table-service';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../services/filter.service';

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
                    provide: TableService,
                    useValue: {
                        activeColumns: (): any[] => [],
                        sortMap: {}
                    }
                },
                {
                    provide: FilterService,
                    useValue: {

                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterAutoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
