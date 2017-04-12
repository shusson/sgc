import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoTreeComponent, JsonLabelPipe } from './anno-tree.component';
import { MdIconModule } from '@angular/material';

describe('AnnoTreeComponent', () => {
    let component: AnnoTreeComponent;
    let fixture: ComponentFixture<AnnoTreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MdIconModule],
            declarations: [AnnoTreeComponent, JsonLabelPipe]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnnoTreeComponent);
        component = fixture.componentInstance;
        component.object = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
