import { Component, OnInit, Input } from '@angular/core';
import { Cohort } from '../../../model/cohort';
import { CohortService } from '../../../services/project-data/cohort-service';
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
    selector: 'app-cohort-card',
    templateUrl: './cohort-card.component.html',
    styleUrls: ['./cohort-card.component.css'],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate(1000)
            ]),
            transition('* => void', [
                animate(1000, style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})
export class CohortCardComponent implements OnInit {
    @Input() cohortId: string;
    @Input() showLogo = true;
    cohort: Cohort;
    currentLogo: string = null;
    private currentPersonId: string = null;
    private currentPersonIdIndex = 0;
    private currentLogoIndex = 0;
    private logoIntervalId: any = null;
    private personIntervalId: any = null;

    constructor(private cohortService: CohortService) {
    }

    ngOnInit() {
        this.cohortService.getCohort(this.cohortId).then((cohort: Cohort) => {
            this.cohort = cohort;
            this.togglePerson();
            this.toggleLogo();
        });

        this.resetPersonInterval();
        this.resetLogoInterval();
    }

    resetLogoInterval() {
        if (this.logoIntervalId) {
            window.clearInterval(this.logoIntervalId);
        }
        this.logoIntervalId = window.setInterval(() => {
            this.toggleLogo();
        }, 5000);
    }

    resetPersonInterval() {
        if (this.personIntervalId) {
            window.clearInterval(this.personIntervalId);
        }
        this.personIntervalId = window.setInterval(() => {
            this.togglePerson();
        }, 5000);
    }

    togglePerson() {
        if (!this.cohort.people) {
            return;
        }
        if (this.currentPersonIdIndex >= this.cohort.people.length - 1) {
            this.currentPersonIdIndex = 0;
        } else {
            this.currentPersonIdIndex++;
        }
        this.currentPersonId = this.cohort.people[this.currentPersonIdIndex];
        this.resetPersonInterval();
    }

    toggleLogo() {
        if (!this.cohort.logos) {
            return;
        }
        if (this.currentLogoIndex >= this.cohort.logos.length - 1) {
            this.currentLogoIndex = 0;
        } else {
            this.currentLogoIndex++;
        }
        this.currentLogo = this.cohort.logos[this.currentLogoIndex];
        this.resetLogoInterval();
    }
}
