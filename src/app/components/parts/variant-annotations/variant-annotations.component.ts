import { Component, Input, OnInit } from '@angular/core';
import { VariantAnnotation } from '../../../model/variant-annotations';

const REDUNDANT_ANNOTATIONS = ['chromosome',
    'reference',
    'alternate',
    'start',
    'id'];

@Component({
    selector: 'app-variant-annotations',
    templateUrl: './variant-annotations.component.html',
    styleUrls: ['./variant-annotations.component.css', '../../../shared/meta-information.css']
})
export class VariantAnnotationsComponent implements OnInit {
    @Input() annotations: VariantAnnotation;
    showOptions = {};

    ngOnInit() {
        REDUNDANT_ANNOTATIONS.forEach((ra) => delete this.annotations[ra]);
    }

    expandAll() {
        let keys = Object.keys(this.showOptions);
        for (let k of keys) {
            this.showOptions[k] = true;
        }
    }

    collapseAll() {
        let keys = Object.keys(this.showOptions);
        for (let k of keys) {
            this.showOptions[k] = false;
        }
    }

}
