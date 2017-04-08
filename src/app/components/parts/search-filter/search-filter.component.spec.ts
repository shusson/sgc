import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterComponent } from './search-filter.component';
import { SearchFilterSelectComponent } from '../search-filter-select/search-filter-select.component';
import { SearchFilterParametersComponent } from '../search-filter-parameters/search-filter-parameters.component';
import { SearchFilterItemComponent } from '../search-filter-item/search-filter-item.component';
import { MdButtonModule, MdCheckboxModule, MdMenuModule, MdSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SearchFilterService } from '../../../services/search-filter.service';
import { MockSearchFilterService } from '../../../mocks/search-filter-service.mock';

describe('SearchFilterComponent', () => {
    let component: SearchFilterComponent;
    let fixture: ComponentFixture<SearchFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MdCheckboxModule,
                MdSelectModule,
                MdButtonModule,
                MdMenuModule,
                FormsModule
            ],
            declarations: [
                SearchFilterComponent,
                SearchFilterItemComponent,
                SearchFilterParametersComponent,
                SearchFilterSelectComponent
            ],
            providers: [
                {
                    provide: SearchFilterService,
                    useValue: new MockSearchFilterService()
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
