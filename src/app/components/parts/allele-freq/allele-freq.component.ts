import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../../../services/table-service';
import { ALLELEFREQ_DIFFERENCE_THRESHOLD } from '../../../shared/afThreshold';

@Component({
    selector: 'app-allele-freq',
    templateUrl: './allele-freq.component.html',
    styleUrls: ['./allele-freq.component.css']
})

export class AlleleFreqComponent implements OnInit {
    @Input() freq: number;
    @Input() highlight: boolean;
    @Input() color = 'steelblue';
    style = {'background-color': 'steelblue'};
    formattedFreq: string;
    tooltipFormattedFreq: string;
    scales: number[] = [
        1 / 10000.0,
        1 / 1000.0,
        1 / 100.0,
        5 / 100.0,
        1 / 2.0
    ];

    constructor(public ts: TableService) {}

    ngOnInit() {
        this.style = this.highlight?{'background-color': 'red'}:{'background-color': this.color};
        if (this.freq !== null) {
            this.formattedFreq = this.freq.toFixed(6);
            this.tooltipFormattedFreq = this.formattedFreq;
            if(this.highlight){
                this.tooltipFormattedFreq = this.freq.toFixed(6) + ` (AF difference exceeds ${ALLELEFREQ_DIFFERENCE_THRESHOLD*100}%)`
            }
        }
    }

}

