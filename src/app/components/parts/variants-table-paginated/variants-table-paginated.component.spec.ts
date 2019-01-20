import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantsTablePaginatedComponent } from './variants-table-paginated.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MapdService } from '../../../services/mapd.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { Router } from '@angular/router';
import { CfMock } from '../../../mocks/cf.mock';
import { MapdMock } from '../../../mocks/mapd.mock';
import { MatIconModule } from '@angular/material';
import { empty } from "rxjs";

describe('VariantsTablePaginatedComponent', () => {
    let component: VariantsTablePaginatedComponent;
    let fixture: ComponentFixture<VariantsTablePaginatedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxDatatableModule,
                MatIconModule
            ],
            declarations: [VariantsTablePaginatedComponent],
            providers: [
                {
                    provide: MapdService,
                    useValue: new MapdMock()
                },
                {
                    provide: CrossfilterService,
                    useValue: new CfMock()
                },
                {
                    provide: Router,
                    useValue: {
                        events: empty()
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VariantsTablePaginatedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
