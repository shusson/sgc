import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantAnnotationsComponent } from './variant-annotations.component';
import { AnnoTreeComponent, JsonLabelPipe } from '../anno-tree/anno-tree.component';
import { MdIconModule } from '@angular/material';
import { VirtualListComponent } from '../virtual-list/virtual-list.component';
import { VirtualListItemComponent } from '../virtual-list-item/virtual-list-item.component';

describe('VariantAnnotationsComponent', () => {
    let component: VariantAnnotationsComponent;
    let fixture: ComponentFixture<VariantAnnotationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MdIconModule],
            declarations: [
                VariantAnnotationsComponent,
                AnnoTreeComponent,
                JsonLabelPipe,
                VirtualListComponent,
                VirtualListItemComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VariantAnnotationsComponent);
        component = fixture.componentInstance;
        component.annotations = <any>{};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
