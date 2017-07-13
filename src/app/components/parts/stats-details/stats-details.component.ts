import { Component, Input, OnInit } from '@angular/core';
import { TStats } from '../../../model/t-stats';

@Component({
    selector: 'app-stats-details',
    templateUrl: './stats-details.component.html',
    styleUrls: ['./stats-details.component.css']
})
export class StatsDetailsComponent implements OnInit {
    @Input() stats: TStats;

    constructor() {
    }

    ngOnInit() {
    }

}
