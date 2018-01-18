import { Variant } from '../model/variant';

export class Sorter {
    constructor(public label = 'start', public descending = false) {}
}

export class TableService {

    showScales = true;

    private displayMap: any = {
        'Variant': (v: Variant) => v.v,
        'Location': (v: Variant) => this.locationString(v),
        'Reference': (v: Variant) => v.ref,
        'Alternate': (v: Variant) => v.alt,
        'Type': (v: Variant) => v.type,
        'dbSNP': (v: Variant) => v.rsid,
        'Homozygotes Count': (v: Variant) => v.nHomVar,
        'Heterozygotes Count': (v: Variant) => v.nHet,
        'Allele Count': (v: Variant) => v.ac,
        'Allele Freq': (v: Variant) => v.af.toExponential(4),
        'cato': (v: Variant) => v.cato,
        'eigen': (v: Variant) => v.eigen,
        'sift': (v: Variant) => v.sift,
        'polyPhen': (v: Variant) => v.polyPhen,
        'tgpAF': (v: Variant) => v.tgpAF,
        'hrcAF': (v: Variant) => v.hrcAF,
        'GnomadAF': (v: Variant) => v.gnomadAF,
        'consequences': (v: Variant) => v.consequences,
        'gene': (v: Variant) => v.geneSymbol,
        'clinvar': (v: Variant) => v.clinvar
    };

    private labelMap: any = {
        'Variant': 'v',
        'Location': 'start',
        'Reference': 'ref',
        'Alternate': 'alt',
        'Type': 'type',
        'dbSNP': 'rsid',
        'Homozygotes Count': 'nHomVar',
        'Heterozygotes Count': 'nHet',
        'Allele Count': 'ac',
        'Allele Freq': 'af',
        'cato': 'cato',
        'eigen': 'eigen',
        'sift': 'sift',
        'polyPhen': 'polyPhen',
        'tgpAF': 'tgpAF',
        'hrcAF': 'hrcAF',
        'GnomadAF': 'gnomadAF',
        'consequences': 'consequences',
        'gene': 'geneSymbol',
        'clinvar': 'clinvar'
    };

    private columns: Map<string, boolean>;

    private tooltips: any = {
        'Allele Freq': () => this.showScales ? 'Allele frequency on a discrete scale: <1/10000, <1/1000, <1%, <5%, <50% and >50%' : ''
    };

    private lastSortedLabel = '';
    private lastSortedOrder = true;

    constructor() {
        this.normalView();
    }

    tooltip(key) {
        return this.tooltips[key] ? this.tooltips[key]() : '';
    }

    display(label: string, variant: Variant): string {
        return this.displayMap[label](variant) ? String(this.displayMap[label](variant)) : '';
    }

    sort(label: string): Sorter {
        if (this.lastSortedLabel === label) {
            this.lastSortedOrder = !this.lastSortedOrder;
        } else {
            this.lastSortedLabel = label;
            this.lastSortedOrder = true;
        }
        return new Sorter(this.labelMap[label], this.lastSortedOrder);
    }

    keys() {
        return Array.from(this.columns.keys());
    }

    get(k: string) {
        return this.columns.get(k);
    }

    set(k: string, v: boolean) {
        this.columns.set(k, v);
    }

    normalView() {
        const keys: any[] = [
            ['Variant', false],
            ['Location', true],
            ['Reference', true],
            ['Alternate', true],
            ['Type', true],
            ['dbSNP', false],
            ['Homozygotes Count', false],
            ['Heterozygotes Count', false],
            ['Allele Count', false],
            ['cato', false],
            ['eigen', false],
            ['sift', false],
            ['polyPhen', false],
            ['tgpAF', false],
            ['hrcAF', false],
            ['consequences', true],
            ['gene', false],
            ['clinvar', false],
            ['GnomadAF', true],
            ['Allele Freq', true]
        ];
        this.columns = new Map<string, boolean>(keys);
    }

    minimalView() {
        const keys: any[] = [
            ['Variant', true],
            ['Location', false],
            ['Reference', false],
            ['Alternate', false],
            ['Type', false],
            ['dbSNP', false],
            ['Homozygotes Count', false],
            ['Heterozygotes Count', false],
            ['Missed Genotypes', false],
            ['Allele Count', false],
            ['Allele Freq', true],
            ['cato', false],
            ['eigen', false],
            ['sift', false],
            ['polyPhen', false],
            ['tgpAF', false],
            ['hrcAF', false],
            ['gnomadAF', false],
            ['consequences', false],
            ['gene', false],
            ['clinvar', false]
        ];
        this.columns = new Map<string, boolean>(keys);
    }

    activeColumns(): string[] {
        const ac: string[] = [];
        this.columns.forEach((v, k) => {
            if (v) {
                ac.push(k);
            }
        });
        return ac;
    }

    private locationString(variant: Variant) {
        return `${variant.chr} : ${variant.start}`;
    }
}
