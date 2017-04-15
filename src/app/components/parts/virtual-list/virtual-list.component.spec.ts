import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualListComponent } from './virtual-list.component';
import { VirtualListItemComponent } from '../virtual-list-item/virtual-list-item.component';
import { AnnoTreeComponent, JsonLabelPipe } from '../anno-tree/anno-tree.component';
import { MdIconModule } from '@angular/material';

describe('VirtualListComponent', () => {
    let component: VirtualListComponent;
    let fixture: ComponentFixture<VirtualListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MdIconModule],
            declarations: [
                AnnoTreeComponent,
                VirtualListComponent,
                VirtualListItemComponent,
                JsonLabelPipe
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VirtualListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
