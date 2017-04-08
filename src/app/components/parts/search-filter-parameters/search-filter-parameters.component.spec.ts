import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterParametersComponent } from './search-filter-parameters.component';
import { MdSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NumericSearchFilterItem } from '../../../model/numeric-search-filter-item';
import { EnumSearchFilterItem } from '../../../model/enum-search-filter-item';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFilterService } from '../../../services/search-filter.service';
import { MockSearchFilterService } from '../../../mocks/search-filter-service.mock';

describe('SearchFilterParametersComponent', () => {
    let component: SearchFilterParametersComponent;
    let fixture: ComponentFixture<SearchFilterParametersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MdSelectModule,
                NoopAnimationsModule
            ],
            declarations: [SearchFilterParametersComponent],
            providers: [
                {
                    provide: SearchFilterService,
                    useValue: new MockSearchFilterService()
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchFilterParametersComponent);
        component = fixture.componentInstance;
        component.item = new EnumSearchFilterItem('a', ['x', 'y']);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
