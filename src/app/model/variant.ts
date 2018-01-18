import { VariantAnnotation } from './variant-annotations';
export const HOMOZYGOTES_KEY = '1/1';
export const HETEROZYGOTES_KEY = '0/1';
const DB_SNP_URL = 'https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi';


export class Variant {
    v: string;
    dbSNP: string;
    chromosome: string;
    start: number;
    reference: string;
    alternate: string;
    altType: string;
    highlight = false;
    AC: number;
    AF: number;
    nHet: number;
    nHomVar: number;
    cato: number;
    eigen: number;
    sift: string;
    polyPhen: string;
    tgpAF: string;
    hrcAF: string;
    gnomadAF: string;
    consequences: string;
    geneSymbol: string;
    clinvar: string;

    static dbSnpUrl(variant: Variant) {
        return `${DB_SNP_URL}?rs=${variant.dbSNP}`;
    }

    static displayName(variant: Variant) {
        return `${ variant.chromosome }-${ variant.start }-${ variant.reference }-${ variant.alternate }`;
    }
}
