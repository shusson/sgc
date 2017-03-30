import { URLSearchParams } from '@angular/http';

const INDEX_BASE = 1;

export class Beacon {
    reference: string;
    chromosome: string;
    position: string;
    allele: string;

    constructor(data: any) {
        this.reference = data.reference ? data.reference : null;
        this.chromosome = data.chromosome ? data.chromosome : null;
        this.position = data.position ? String(Number(data.position) + INDEX_BASE) : null;
        this.allele = data.allele ? data.allele : null;
    }

    getSearchParams(): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        params.set('ref', this.reference);
        params.set('chrom', this.chromosome);
        params.set('pos', String(Number(this.position) - INDEX_BASE));
        params.set('allele', this.allele);
        return params;
    }
}
