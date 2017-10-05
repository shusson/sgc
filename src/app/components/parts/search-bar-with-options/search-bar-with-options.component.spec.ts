/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchBarWithOptionsComponent } from './search-bar-with-options.component';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchOptionComponent } from '../search-option/search-option.component';
import { ScrollService } from '../../../services/scroll-service';
import { SearchBarService } from '../../../services/search-bar-service';
import { MockSearchBarService } from '../../../mocks/search-bar-service.mock';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MaterialModule } from '../../../app.material';

describe('SearchBarWithOptionsComponent', () => {
    let component: SearchBarWithOptionsComponent;
    let fixture: ComponentFixture<SearchBarWithOptionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MaterialModule,
            ],
            declarations: [
                SearchBarComponent,
                SearchOptionComponent,
                SearchBarWithOptionsComponent,
            ],
            providers: [
                ScrollService,
                {
                    provide: SearchBarService,
                    useValue: new MockSearchBarService()
                },
                {
                    provide: Router,
                    useValue: {
                        events: Observable.empty()
                    }
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBarWithOptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
