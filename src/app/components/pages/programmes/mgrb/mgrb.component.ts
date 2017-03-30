import { Component, OnInit } from '@angular/core';
import { Initiative } from '../../../../model/initiative';
import { Cohort } from '../../../../model/cohort';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { InitiativeService } from '../../../../services/project-data/initiative-service';
import { CohortService } from '../../../../services/project-data/cohort-service';
import { ScrollService } from '../../../../services/scroll-service';

const PROGRAMME_ID = 'mgrb';

@Component({
    selector: 'app-mgrb',
    templateUrl: './mgrb.component.html',
    styleUrls: ['./mgrb.component.css', '../programme.css']
})
export class MgrbComponent implements OnInit {
    initiative: Initiative;
    otherInitiatives: Initiative[];
    cohorts: Cohort[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private initiativeService: InitiativeService,
                private cohortService: CohortService,
                private scrollService: ScrollService) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.initiativeService.getInitiative(PROGRAMME_ID).then((initiative) => {
                this.initiative = initiative;
                Promise.all(this.initiative.cohorts.map((id: string) => {
                    return this.cohortService.getCohort(id);
                })).then((result: Cohort[]) => {
                    this.cohorts = result;
                });
            });
            this.initiativeService.getInitiatives().then((initiatives) => {
                this.otherInitiatives = Array.from(<Iterable<Initiative>> initiatives.values()).filter(v => v.id !== PROGRAMME_ID);
            });
        });
    }

    goHome() {
        this.router.navigate(['/initiatives']);
    }

    backToTop() {
        this.scrollService.scrollToTop();
    }
}
