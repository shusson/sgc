import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterModule, RouterOutletMap } from '@angular/router';
import { AppComponent } from './app.component';
import { BeaconNetworkService } from './services/beacon/beacon-network-service';

describe('App Component', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterModule
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                {
                    provide: RouterOutletMap,
                    useValue: {
                        registerOutlet: () => {
                        },
                        removeOutlet: () => {
                        }
                    },
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
