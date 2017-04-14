import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';
import * as uuid from 'uuid';
import { AnnotationTreeService } from '../../../services/annotation.service';
import { Subscription } from 'rxjs/Subscription';

@Pipe({name: 'jsonLabel'})
export class JsonLabelPipe implements PipeTransform {
    transform(v: string): string {
        return v.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
    }
}

@Component({
    selector: 'app-anno-tree',
    templateUrl: './anno-tree.component.html',
    styleUrls: ['./anno-tree.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnoTreeComponent implements OnInit, OnDestroy {
    @Input() object: any;
    keys: string[];
    id: string = uuid.v4();
    subs: Subscription[] = [];

    constructor(private cd: ChangeDetectorRef,
                private ats: AnnotationTreeService) {
    }

    ngOnInit() {
        this.keys = Object.keys(this.object);
        this.keys.sort((a: string, b: string) => {
            return this.isSimple(this.object[a]) ? -1 : 1;
        });

        this.ats.initNode(this.id, this.keys);

        this.subs.push(this.ats.updates.subscribe(() => {
            this.cd.detectChanges();
        }));
    }

    isArray(v: any) {
        return v instanceof Array;
    }

    isSimple(v: any) {
        return typeof v === 'number' || typeof v === 'string' || typeof v === 'boolean' || v === null;
    }

    isComplex(v: any) {
        return (v instanceof Object) && !(v instanceof Array);
    }

    toggleShow(k: string) {
        this.ats.toggleShow(this.id, k);
    }

    isShown(k: string): boolean {
        return this.ats.isShown(this.id, k);
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }
}
