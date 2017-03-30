import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Initiative } from '../../../model/initiative';

@Component({
    selector: 'app-program-card',
    templateUrl: './program-card.component.html',
    styleUrls: ['./program-card.component.css']
})
export class ProgramCardComponent implements OnInit {
    @Input() initiative: Initiative;
    @Input() showDetails = true;

    constructor(private router: Router) {}

    ngOnInit() {
    }

    percentComplete() {
        return ((+this.initiative.sequenced) / (+this.initiative.genomes)) * 100;
    }

    gotoDetail(initiative: Initiative) {
        let link = ['/initiatives', initiative.id];
        this.router.navigate(link);
    }
}
