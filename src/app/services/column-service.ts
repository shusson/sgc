import { Variant, HOMOZYGOTES_KEY, HETEROZYGOTES_KEY, MISSED_GENOTYPES_KEY } from '../model/variant';

export class ColumnService {

    private displayMap: any = {
        'Location': (v: Variant) => this.locationString(v),
        'Reference': (v: Variant) => v.reference,
        'Alternate': (v: Variant) => v.alternate,
        'Type': (v: Variant) => v.type,
        'dbSNP': (v: Variant) => v.dbSNP,
        'Homozygotes Count': (v: Variant) => v.variantStats[0] ? v.variantStats[0].genotypesCount[HOMOZYGOTES_KEY] : null,
        'Heterozygotes Count': (v: Variant) => v.variantStats[0] ? v.variantStats[0].genotypesCount[HETEROZYGOTES_KEY] : null,
        'Missed Genotypes': (v: Variant) => v.variantStats[0] ? v.variantStats[0].genotypesCount[MISSED_GENOTYPES_KEY] : null,
        'Allele Count': (v: Variant) => v.variantStats[0] ? v.variantStats[0].altAlleleCount : null,
        'Allele Freq.': (v: Variant) => v.variantStats[0] ? v.variantStats[0].altAlleleFreq.toExponential(4) : null,
        'Allele Scale': (v: Variant) => v.variantStats[0] ? v.variantStats[0].altAlleleFreq : null
    };

    private searchResultKeys: any[] = [
        ['Location', true],
        ['Reference', true],
        ['Alternate', true],
        ['Type', true],
        ['dbSNP', true],
        ['Homozygotes Count', true],
        ['Heterozygotes Count', false],
        ['Missed Genotypes', false],
        ['Allele Count', true],
        ['Allele Freq.', true],
        ['Allele Scale', true]
    ];

    private columns: Map<string, boolean> = new Map<string, boolean>(this.searchResultKeys);

    private sortMap: any = {
        'Location': (v: Variant) => v.start,
        'Reference': (v: Variant) => v.reference,
        'Alternate': (v: Variant) => v.alternate,
        'Type': (v: Variant) => v.type,
        'dbSNP': (v: Variant) => v.dbSNP ? v.dbSNP.match(/rs(\d+)/)[1] : 0,
        'Homozygotes Count': (v: Variant) => {
            if (!v.variantStats[0]) {
                return 0;
            }
            return v.variantStats[0].genotypesCount[HOMOZYGOTES_KEY] ? v.variantStats[0].genotypesCount[HOMOZYGOTES_KEY] : 0;
        },
        'Heterozygotes Count': (v: Variant) => {
            if (!v.variantStats[0]) {
                return 0;
            }
            return v.variantStats[0].genotypesCount[HETEROZYGOTES_KEY] ?
                v.variantStats[0].genotypesCount[HETEROZYGOTES_KEY] : 0;
        },
        'Missed Genotypes': (v: Variant) => {
            if (!v.variantStats[0]) {
                return 0;
            }
            return v.variantStats[0].genotypesCount[MISSED_GENOTYPES_KEY] ?
                v.variantStats[0].genotypesCount[MISSED_GENOTYPES_KEY] : 0;
        },
        'Allele Count': (v: Variant) => v.variantStats[0] ? v.variantStats[0].altAlleleCount : 0,
        'Allele Freq.': (v: Variant) => v.variantStats[0] ? v.variantStats[0].altAlleleFreq : 0,
        'Allele Scale': (v: Variant) => v.variantStats[0] ? v.variantStats[0].altAlleleFreq : 0
    };

    private tooltips: any = {
        'Allele Scale': 'Allele frequency on a discrete scale: <1/10000, <1/1000, <1%, <5%, <50% and >50%'
    };

    private lastSortedLabel = '';
    private lastSortedOrder = true;

    constructor() {

    }

    tooltip(key) {
        return this.tooltips[key];
    }

    display(label: string, variant: Variant): string {
        return this.displayMap[label](variant) ? String(this.displayMap[label](variant)) : '';
    }

    sort(label: string, variants: Variant[]) {
        if (this.lastSortedLabel === label) {
            this.lastSortedOrder = !this.lastSortedOrder;
        } else {
            this.lastSortedLabel = label;
            this.lastSortedOrder = true;
        }
        let fn = this.sortMap[label];
        if (this.lastSortedOrder) {
            variants.sort((a: any, b: any) => {
                if (fn(a) < fn(b)) {
                    return -1;
                } else if (fn(a) > fn(b)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            variants.sort((a: any, b: any) => {
                if (fn(a) > fn(b)) {
                    return -1;
                } else if (fn(a) < fn(b)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
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

    minimalView() {
        let keys: any[] = [
            ['Location', true],
            ['Reference', true],
            ['Alternate', true],
            ['Type', false],
            ['dbSNP', false],
            ['Homozygotes Count', false],
            ['Heterozygotes Count', false],
            ['Missed Genotypes', false],
            ['Allele Count', false],
            ['Allele Freq.', true],
            ['Allele Scale', false]
        ];
        this.columns = new Map<string, boolean>(keys);
    }

    activeColumns(): string[] {
        let ac: string[] = [];
        this.columns.forEach((v, k) => {
            if (v) {
                ac.push(k);
            }
        });
        return ac;
    }

    private locationString(variant: Variant) {
        return `${variant.chromosome} : ${variant.start}`;
    }
}
