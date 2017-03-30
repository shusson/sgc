import { Injectable } from '@angular/core';
import { Variant, HOMOZYGOTES_KEY, HETEROZYGOTES_KEY, MISSED_GENOTYPES_KEY } from '../model/variant';
import SearchApi from 'js-worker-search';
import { isUndefined } from 'util';

export type FilterOperator = '<' | '>' | '=' | '!=';

export const COMMAND_TOKEN = '/';
const SLASH_INDEX = 1;
const COMMAND_INDEX = 2;
const OP_INDEX = 3;
const VALUE_INDEX = 4;

@Injectable()
export class FilterService {

    readonly commandMap: any = {
        'dbSNP': (v: Variant) => v.dbSNP,
        'chromosome': (v: Variant) => v.chromosome,
        'start': (v: Variant) => v.start,
        'reference': (v: Variant) => v.reference,
        'alternate': (v: Variant) => v.alternate,
        'type': (v: Variant) => v.type,
        'alleleFrequency': (v: Variant) => v.variantStats[0].altAlleleFreq,
        'alleleCount': (v: Variant) => v.variantStats[0].altAlleleCount,
        'homozygotesCount': (v: Variant) => v.variantStats[0].genotypesCount[HOMOZYGOTES_KEY],
        'heterozygotesCount': (v: Variant) => v.variantStats[0].genotypesCount[HETEROZYGOTES_KEY],
        'missedGenotypesCount': (v: Variant) => v.variantStats[0].genotypesCount[MISSED_GENOTYPES_KEY]
    };

    readonly operators: FilterOperator[] = ['<', '>', '=', '!='];

    private searchApi: any;

    constructor() {
        this.searchApi = new SearchApi();
        this.keys().sort().forEach((k) => {
            this.searchApi.indexDocument(k, COMMAND_TOKEN + k);
        });

        this.operators.forEach((op) => {
            this.searchApi.indexDocument(op, op);
        });
    }

    keys() {
        return Object.keys(this.commandMap);
    }

    isValidCommand(s: string): boolean {
        let r = this.parseCommand(s);
        return r !== null && r.length === 5 && r[COMMAND_INDEX] !== '' && r[OP_INDEX] !== '';
    }

    nextTokens(s: string): Promise<string[]> {
        let m = s.match(this.regex());
        if (!m) {
            return Promise.resolve([]);
        }
        let slash = m[SLASH_INDEX];
        let command = m[COMMAND_INDEX];
        let op = m[OP_INDEX];
        if (slash && command && op) {
            return Promise.resolve([]);
        } else if (slash && command) {
            let lo = m.input.substr(m.input.indexOf(command) + command.length, m.input.length);
            if (lo) {
                return this.searchApi.search(lo);
            } else {
                return Promise.resolve(this.operators);
            }
        } else if (slash) {
            let lo = m.input.substr(1);
            if (lo) {
                return this.searchApi.search(lo);
            } else {
                return Promise.resolve(this.keys().sort());
            }
        }
    }

    isCommand(s: string) {
        return s.indexOf(COMMAND_TOKEN) !== -1;
    }

    filterVariants(command: string, variants: Variant[]) {
        if (!this.isValidCommand(command)) {
            return variants;
        }
        let args = this.parseCommand(command);
        return this.filter(args[COMMAND_INDEX], <FilterOperator>args[OP_INDEX], args[VALUE_INDEX], variants);
    }

    filter(command: string, op: FilterOperator, value: string | number, variants: Variant[]) {
        if (!command) {
            return variants;
        }

        value = this.isNumeric(value) ? Number(value) : value;

        return variants.filter(v => {
            let a = this.commandMap[command](v);
            if (a === null || isUndefined(a)) {
                a = '';
            }
            switch (op) {
                case '<':
                    return a < value;
                case '>':
                    return a > value;
                case '=':
/* tslint:disable */
                    return a == value;
                case '!=':
                    return a != value;
/* tslint:enable */
                default:
                    return true;
            }
        });
    }

    clean(s: string): string {
        let match = s.match(this.regex());
        return match.slice(1, 4).join('');
    }

    private regex(): RegExp {
        let s = `(\/)(?:.*(${ this.keys().join('|') })(?:.*?((?:!=)|[<>=])([^!<>=\n]*))*)*`;
        return new RegExp(s, 'i');
    }

    private parseCommand(command: string): RegExpMatchArray {
        if (!this.isCommand(command)) {
            return [];
        }
        return command.match(this.regex());
    }

    private isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }


}
