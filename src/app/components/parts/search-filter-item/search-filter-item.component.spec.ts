import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterItemComponent } from './search-filter-item.component';
import { SearchFilterParametersComponent } from '../search-filter-parameters/search-filter-parameters.component';
import { SearchFilterSelectComponent } from '../search-filter-select/search-filter-select.component';
import { MaterialModule, MdButtonModule, MdCheckboxModule, MdMenuModule, MdSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SearchFilterService } from '../../../services/search-filter.service';
import { MockSearchFilterService } from '../../../mocks/search-filter-service.mock';
import { EnumSearchFilterItem } from '../../../model/enum-search-filter-item';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VariantSearchService } from '../../../services/variant-search-service';
import { MockVariantSearchService } from '../../../mocks/variant-search-service.mock';

describe('SearchFilterItemComponent', () => {
    let component: SearchFilterItemComponent;
    let fixture: ComponentFixture<SearchFilterItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MdCheckboxModule,
                MdSelectModule,
                MdButtonModule,
                MdMenuModule,
                NoopAnimationsModule
            ],
            declarations: [
                SearchFilterItemComponent,
                SearchFilterParametersComponent,
                SearchFilterSelectComponent
            ],
            providers: [
                {
                    provide: SearchFilterService,
                    useValue: new MockSearchFilterService()
                },
                {
                    provide: VariantSearchService,
                    useValue: new MockVariantSearchService()
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchFilterItemComponent);
        component = fixture.componentInstance;
        component.item = new EnumSearchFilterItem('a', ['a', 'b']);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
