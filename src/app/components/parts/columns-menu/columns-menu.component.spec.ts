/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ColumnsMenuComponent } from './columns-menu.component';
import { TableService } from '../../../services/column-service';
import { MaterialModule } from '../../../app.material';

describe('ColumnsMenuComponent', () => {
    let component: ColumnsMenuComponent;
    let fixture: ComponentFixture<ColumnsMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule],
            declarations: [ColumnsMenuComponent],
            providers: [
                {
                    provide: TableService,
                    useValue: {
                        activeColumns: (): any[] => []
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColumnsMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
