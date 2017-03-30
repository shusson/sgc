import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Cohort } from '../../../model/cohort';
import { CohortService } from '../../../services/project-data/cohort-service';

@Component({
    selector: 'app-cohort-list',
    templateUrl: './cohort-list.component.html',
    styleUrls: ['./cohort-list.component.css']
})
export class CohortListComponent implements OnInit {
    @Input() cohortIds: string[];
    @Output() onChanged = new EventEmitter<void>();
    cohorts: Cohort[] = [];
    selected: Map<string, boolean> = new Map<string, boolean>();

    constructor(private cohortService: CohortService) {}

    ngOnInit() {
        let allPromises: any[] = [];
        this.cohortIds.forEach((id) => {
            allPromises.push(this.cohortService.getCohort(id).then((cohort) => {
                this.cohorts.push(cohort);
            }));
        });

        Promise.all(allPromises).then(() => {
            for (let cohort of this.cohorts) {
                this.selected.set(cohort.id, true);
            }
        });
    }

    toggle(cohort: Cohort) {
        this.selected.set(cohort.id, this.selected.get(cohort.id) ? false : true);
        this.onChanged.emit();
    }

}
