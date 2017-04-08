import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterSelectComponent } from './search-filter-select.component';
import { MaterialModule } from '@angular/material';
import { SearchFilterService } from '../../../services/search-filter.service';
import { MockSearchFilterService } from '../../../mocks/search-filter-service.mock';

describe('SearchFilterSelectComponent', () => {
    let component: SearchFilterSelectComponent;
    let fixture: ComponentFixture<SearchFilterSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [SearchFilterSelectComponent],
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
        fixture = TestBed.createComponent(SearchFilterSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
