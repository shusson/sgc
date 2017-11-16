import { Component, OnInit } from '@angular/core';
import { Cohort } from '../../../model/cohort';
import { Initiative } from '../../../model/initiative';
import { CohortService } from '../../../services/project-data/cohort-service';
import { InitiativeService } from '../../../services/project-data/initiative-service';

@Component({
    selector: 'app-summary-dialog',
    templateUrl: './summary-dialog.component.html',
    styleUrls: ['./summary-dialog.component.css']
})
export class SummaryDialogComponent implements OnInit {

    initiative: Initiative;
    cohorts: Cohort[];

    constructor(private initiativeService: InitiativeService,
                private cohortService: CohortService) {
    }

    ngOnInit() {
        this.initiativeService.getInitiative('mgrb').then((initiative) => {
            this.initiative = initiative;
            Promise.all(this.initiative.cohorts.map((id: string) => {
                return this.cohortService.getCohort(id);
            })).then((result: Cohort[]) => {
                this.cohorts = result;
            });
        });
    }

}
