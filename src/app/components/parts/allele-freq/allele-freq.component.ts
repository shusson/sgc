import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-allele-freq',
    templateUrl: './allele-freq.component.html',
    styleUrls: ['./allele-freq.component.css']
})

export class AlleleFreqComponent implements OnInit {
    @Input() freq: number;
    formattedFreq: string;
    scales: number[] = [
        1 / 10000.0,
        1 / 1000.0,
        1 / 100.0,
        5 / 100.0,
        1 / 2.0
    ];

    ngOnInit() {
        this.formattedFreq = this.freq.toFixed(6);
    }
}

