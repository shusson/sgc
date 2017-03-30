export const HOMOZYGOTES_KEY = '1/1';
export const HETEROZYGOTES_KEY = '0/1';
export const MISSED_GENOTYPES_KEY = './.';


export class VariantStat {
    altAlleleFreq: number;
    altAlleleCount: number;
    genotypesCount: any;
}

export class Variant {
    name: string;
    dbSNP: string;
    chromosome: number;
    start: number;
    reference: string;
    alternate: string;
    type: string;
    variantStats: VariantStat[];
    highlight = false;
}
