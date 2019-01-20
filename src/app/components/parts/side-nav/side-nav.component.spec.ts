/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../app.material';

import { SideNavComponent } from './side-nav.component';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth-service';
import { empty } from "rxjs";

describe('SideNavComponent', () => {
    let component: SideNavComponent;
    let fixture: ComponentFixture<SideNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [
                SideNavComponent
            ],
            providers: [
                {
                    provide: Router,
                    useValue: {
                        events: empty()
                    }
                },
                {
                    provide: Auth,
                    useValue: {
                        authenticated: () => {
                        }
                    }
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
