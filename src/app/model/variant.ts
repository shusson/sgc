export const HOMOZYGOTES_KEY = '1/1';
export const HETEROZYGOTES_KEY = '0/1';
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
        return `${ variant.chr }-${ variant.start }-${ variant.ref }-${ variant.alt }`;
    }
}
