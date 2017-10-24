import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoTreeComponent, JsonLabelPipe } from './anno-tree.component';
import { MatIconModule } from '@angular/material';
import { VirtualListComponent } from '../virtual-list/virtual-list.component';
import { VirtualListItemComponent } from '../virtual-list-item/virtual-list-item.component';
import { AnnotationTreeService } from '../../../services/annotation.service';
import { Observable } from 'rxjs/Observable';

describe('AnnoTreeComponent', () => {
    let component: AnnoTreeComponent;
    let fixture: ComponentFixture<AnnoTreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatIconModule],
            declarations: [
                AnnoTreeComponent,
                JsonLabelPipe,
                VirtualListComponent,
                VirtualListItemComponent
            ],
            providers: [
                {
                    provide: AnnotationTreeService,
                    useValue: {
                        initNode: () => {},
                        updates: Observable.empty()
                    }
                }
            ]
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
