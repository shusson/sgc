import { Component, Input, ViewChild, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { Initiative, DistributionData } from '../../../model/initiative';
import { CohortListComponent } from '../cohort-list/cohort-list.component';
import { ColumnChartComponent } from '../charts/column-chart.component';
import { PieChartComponent } from '../charts/pie-chart.component';
import { InitiativeService } from '../../../services/project-data/initiative-service';
import { CohortService } from '../../../services/project-data/cohort-service';

@Component({
    selector: 'app-graphs-widget',
    templateUrl: './graphs-widget.component.html',
    styleUrls: ['./graphs-widget.component.css']
})
export class GraphsWidgetComponent implements AfterViewInit {
    @ViewChild(CohortListComponent) cohortList: CohortListComponent;
    @Input() initiative: Initiative;
    @Input() heightPx = 200;
    @Input() widthPx = 190;
    @Input() showList = true;

    @ViewChildren(ColumnChartComponent) simpleCharts: QueryList<ColumnChartComponent>;
    @ViewChildren(PieChartComponent) pieCharts: QueryList<PieChartComponent>;

    age: any;
    height: any;
    weight: any;
    sex: any;

    constructor(private initiativeService: InitiativeService,
                private cohortService: CohortService) {}

    ngAfterViewInit() {
        if (!this.showList) {
            this.initiativeService.getInitiative(this.initiative.id).then((initiative) => {
                this.updateData(initiative);
            });
        } else {
            this.update();
        }

    }

    update() {
        this.clearCharts();
        const allSelected: any = Array.from(<Iterable<boolean>>this.cohortList.selected.values()).every((v) => v);
        if (allSelected) {
            this.initiativeService.getInitiative(this.initiative.id).then((initiative) => {
                this.updateData(initiative);
            });
        } else {
            this.cohortList.selected.forEach((selected, cohortId, m) => {
                if (selected) {
                    this.cohortService.getCohort(cohortId).then((cohort) => {
                        this.updateData(cohort);
                    });
                }
            });
        }
    }

    private clearCharts = () => {
        this.simpleCharts.toArray().forEach((child) => child.clearSeries());
        this.pieCharts.toArray().forEach((child) => child.clearSeries());
    };

    private updateData = (graphData: DistributionData) => {
        this.age = graphData.ages;
        this.height = graphData.heights;
        this.weight = graphData.weights;
        this.sex = graphData.sex;

        // this timeout should not be required
        window.setTimeout(() => {
            this.simpleCharts.toArray().forEach((child) => child.update());
            this.pieCharts.toArray().forEach((child) => child.update());
        }, 0);
    }
}
