/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchOptionComponent } from './search-option.component';
import { SearchBarService } from '../../../services/search-bar-service';
import { MockSearchBarService } from '../../../mocks/search-bar-service.mock';
import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { SearchOption } from '../../../model/search-option';

describe('Component: SearchOption', () => {
    let component: SearchOptionComponent;
    let fixture: ComponentFixture<SearchOptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
            ],
            declarations: [
                SearchOptionComponent
            ],
            providers: [
                {
                    provide: SearchBarService,
                    useValue: new MockSearchBarService()
                },
                {
                    provide: ElementRef,
                    useValue: {}
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchOptionComponent);
        component = fixture.componentInstance;
        component.option = new SearchOption('', '', [], '');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

