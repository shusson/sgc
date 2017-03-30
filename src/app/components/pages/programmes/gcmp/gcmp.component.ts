import { Component, OnInit } from '@angular/core';
import { Initiative } from '../../../../model/initiative';
import { Cohort } from '../../../../model/cohort';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { InitiativeService } from '../../../../services/project-data/initiative-service';
import { CohortService } from '../../../../services/project-data/cohort-service';
import { ScrollService } from '../../../../services/scroll-service';

const PROGRAMME_ID = 'gcmp';

@Component({
    selector: 'app-gcmp',
    templateUrl: './gcmp.component.html',
    styleUrls: ['./gcmp.component.css', '../programme.css']
})
export class GcmpComponent implements OnInit {

    initiative: Initiative;
    otherInitiatives: Initiative[];
    cohorts: Cohort[];
    activeAnchor = '';

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

        this.router.events
            .filter((x, idx) => x instanceof NavigationEnd)
            .subscribe((event: any) => {
                this.activeAnchor = '';
                let anchor = new RegExp(/#(.*)/);
                let anchorMatches = event.url.match(anchor);
                if (anchorMatches && anchorMatches.length > 1) {
                    this.activeAnchor = anchorMatches[1];
                }
            });
    }


    goHome() {
        this.router.navigate(['/initiatives']);
    }

    backToTop() {
        this.scrollService.scrollToTop();
    }

}
