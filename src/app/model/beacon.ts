import { HttpParams } from '@angular/common/http';

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

    getSearchParams(): HttpParams {
        return new HttpParams()
            .set('ref', this.reference)
            .set('chrom', this.chromosome)
            .set('pos', String(Number(this.position) - INDEX_BASE))
            .set('allele', this.allele);
    }
}
