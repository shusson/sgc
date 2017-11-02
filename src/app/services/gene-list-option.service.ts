import { Injectable } from '@angular/core';
import { GeneList, GeneListsService } from './autocomplete/gene-lists-service';

class GeneListOption {
    enabled = false;
    constructor(public geneList: GeneList) {}
}

@Injectable()
export class GeneListOptionService {
    lists: GeneListOption[] = [];

    constructor(private gls: GeneListsService) {
        gls.getLists().subscribe(ls => {
            this.lists = ls.map(l => new GeneListOption(l))
        });
    }

    enabledLists() {
        return this.lists.filter(l => l.enabled);
    }
}
