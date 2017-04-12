import { Component, Input, OnInit } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'jsonLabel'})
export class JsonLabelPipe implements PipeTransform {
    transform(v: string): string {
        return v.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
    }
}

@Component({
    selector: 'app-anno-tree',
    templateUrl: './anno-tree.component.html',
    styleUrls: ['./anno-tree.component.css']
})
export class AnnoTreeComponent implements OnInit {
    @Input() object: any;
    @Input() show: any;
    keys: string[];

    constructor() {
    }

    ngOnInit() {
        this.keys = Object.keys(this.object);
        this.keys.sort((a: string, b: string) => {
            return this.isSimple(this.object[a]) ? -1 : 1;
        });
        this.keys.forEach((k) => this.show[k] = false);
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


}
