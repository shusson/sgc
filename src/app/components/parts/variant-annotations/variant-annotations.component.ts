import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit,
    ViewChild
} from '@angular/core';
import { VariantAnnotation } from '../../../model/variant-annotations';
import { AnnoTreeComponent } from '../anno-tree/anno-tree.component';
import { AnnotationTreeService } from '../../../services/annotation.service';

const REDUNDANT_ANNOTATIONS = ['chromosome',
    'reference',
    'alternate',
    'start',
    'id'];

@Component({
    selector: 'app-variant-annotations',
    templateUrl: './variant-annotations.component.html',
    styleUrls: ['./variant-annotations.component.css', '../../../shared/meta-information.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AnnotationTreeService]
})
export class VariantAnnotationsComponent implements OnInit {
    @Input() annotations: VariantAnnotation;

    constructor(private cd: ChangeDetectorRef, private ats: AnnotationTreeService) {

    }

    ngOnInit() {
        REDUNDANT_ANNOTATIONS.forEach((ra) => delete this.annotations[ra]);
    }

    expandAll() {
        this.ats.expandAll();
    }

    collapseAll() {
        this.ats.collapseAll();
    }

}
