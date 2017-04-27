import { Component, Input, OnInit } from '@angular/core';
import { Variant } from '../../../model/variant';
import { VariantScore } from '../../../model/variant-annotations';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
    @Input() variant: Variant;
    scores: VariantScore[] = [];

    constructor() {
    }

    ngOnInit() {
        this.variant.annotation.functionalScore.forEach((s) => this.scores.push(s));
        this.variant.annotation.conservation.forEach((s) => this.scores.push(s));
    }
}
