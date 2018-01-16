import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Auth } from './services/auth-service';

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
                ChildrenOutletContexts,
                {
                    provide: Auth,
                    useValue: {
                        handleAuthentication: () => {}
                    }
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
