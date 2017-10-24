import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProgramCardComponent } from './program-card.component';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material';
import { Initiative } from '../../../model/initiative';

describe('Component: ProgramCard', () => {

    let component: ProgramCardComponent;
    let fixture: ComponentFixture<ProgramCardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatProgressBarModule,
            ],
            declarations: [
                ProgramCardComponent
            ],
            providers: [
                {
                    provide: Router,
                    useValue: {}
                },
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgramCardComponent);
        component = fixture.componentInstance;
        component.initiative = new Initiative();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
