import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconTableComponent } from './beacon-table.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FormsModule } from '@angular/forms';
import { BeaconNetworkService } from '../../../services/beacon/beacon-network-service';

describe('BeaconTableComponent', () => {
    let component: BeaconTableComponent;
    let fixture: ComponentFixture<BeaconTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [Ng2PaginationModule, FormsModule],
            declarations: [BeaconTableComponent],
            providers: [
                {
                    provide: BeaconNetworkService,
                    useValue: {}
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BeaconTableComponent);
        component = fixture.componentInstance;
        component.foundOnly = false;
        component.beacons = <any>{responses: []};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
