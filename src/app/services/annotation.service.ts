import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AnnotationTreeService {
    showOptions = {};
    updates = new Subject<any>();

    constructor() {
    }

    initNode(id: string, keys: string[]) {
        this.showOptions[id] = {};
        keys.forEach((k) => this.showOptions[id][k] = false);
    }

    expandAll() {
        let keys = Object.keys(this.showOptions);
        for (let k of keys) {
            for (let j of Object.keys(this.showOptions[k])) {
                this.showOptions[k][j] = true;
            }
        }
        this.updates.next();
    }

    collapseAll() {
        let keys = Object.keys(this.showOptions);
        for (let k of keys) {
            for (let j of Object.keys(this.showOptions[k])) {
                this.showOptions[k][j] = false;
            }
        }
        this.updates.next();
    }

    toggleShow(id: string, k: string) {
        this.showOptions[id][k] = this.showOptions[id][k] === null ? true : !this.showOptions[id][k];
        this.updates.next();
    }

    isShown(id: string, k: string) {
        return this.showOptions[id][k];
    }

}
