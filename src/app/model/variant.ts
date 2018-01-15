export const HOMOZYGOTES_KEY = '1/1';
export const HETEROZYGOTES_KEY = '0/1';
export const MISSED_GENOTYPES_KEY = './.';
const DB_SNP_URL = 'https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi';

export class Variant {
    v: string;
    rsid: string;
    chr: string;
    start: number;
    ref: string;
    alt: string;
    type: string;
    highlight = false;
    ac: number;
    af: number;
    nHomRef: number;
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
        return `${DB_SNP_URL}?rs=${variant.rsid}`;
    }

    static displayName(variant: Variant) {
        return variant.v.split(':').join('-');
    }

    static hash(variant: Variant) {
        const d = [
            variant.chr,
            variant.start,
            variant.alt,
            variant.ref,
            variant.af,
            variant.ac,
            variant.rsid,
        ];
        return window.btoa(JSON.stringify(d));
    }
}
