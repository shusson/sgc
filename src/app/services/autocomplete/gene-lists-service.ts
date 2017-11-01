import { Injectable } from '@angular/core';
import { ACMG_LIST } from './gene-lists/acmg';
import { AD_LIST } from './gene-lists/ad';
import { AR_LIST } from './gene-lists/ar';
import { BROCA_LIST } from './gene-lists/broca';
import { FDA_LIST } from './gene-lists/fda';
import { REPAIR_KANG_LIST } from './gene-lists/kang';
import { Observable } from 'rxjs/Observable';

export class GeneList {
    name = '';
    references: string[] = [];
    ids: string[] = [];
}

@Injectable()
export class GeneListsService {

    /*  these lists were acquired by https://github.com/shusson/gene_lists/tree/ensembl_ids
        which is a fork of https://github.com/macarthur-lab/gene_lists
     */
    lists = [
        ACMG_LIST,
        AD_LIST,
        AR_LIST,
        BROCA_LIST,
        FDA_LIST,
        REPAIR_KANG_LIST
    ];

    getLists(): Observable<GeneList[]> {
        return Observable.of(this.lists);
    }
}
