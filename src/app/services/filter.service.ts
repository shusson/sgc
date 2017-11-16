import { Injectable } from '@angular/core';
import { Variant } from '../model/variant';
import SearchApi from 'js-worker-search';
import { isUndefined } from 'util';
import { TableService } from './table-service';

export type FilterOperator = '<' | '>' | '=' | '!=';

export const COMMAND_TOKEN = '/';
const SLASH_INDEX = 1;
const COMMAND_INDEX = 2;
const OP_INDEX = 3;
const VALUE_INDEX = 4;

@Injectable()
export class FilterService {

    readonly operators: FilterOperator[] = ['<', '>', '=', '!='];

    private searchApi: any;

    constructor(public ts: TableService) {
        this.searchApi = new SearchApi();
        this.keys().sort().forEach((k) => {
            this.searchApi.indexDocument(k, COMMAND_TOKEN + k);
        });

        this.operators.forEach((op) => {
            this.searchApi.indexDocument(op, op);
        });
    }

    keys() {
        return Object.keys(this.ts.sortMap);
    }

    isValidCommand(s: string): boolean {
        const r = this.parseCommand(s);
        return r !== null && r.length === 5 && r[COMMAND_INDEX] !== '' && r[OP_INDEX] !== '';
    }

    nextTokens(s: string): Promise<string[]> {
        const m = s.match(this.regex());
        if (!m) {
            return Promise.resolve([]);
        }
        const slash = m[SLASH_INDEX];
        const command = m[COMMAND_INDEX];
        const op = m[OP_INDEX];
        if (slash && command && op) {
            return Promise.resolve([]);
        } else if (slash && command) {
            const lo = m.input.substr(m.input.indexOf(command) + command.length, m.input.length);
            if (lo) {
                return this.searchApi.search(lo);
            } else {
                return Promise.resolve(this.operators);
            }
        } else if (slash) {
            const lo = m.input.substr(1);
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
        const args = this.parseCommand(command);
        return this.filter(args[COMMAND_INDEX], <FilterOperator>args[OP_INDEX], args[VALUE_INDEX], variants);
    }

    filter(command: string, op: FilterOperator, value: string | number, variants: Variant[]) {
        if (!command) {
            return variants;
        }

        value = this.isNumeric(value) ? Number(value) : value;

        return variants.filter(v => {
            let a = this.ts.sortMap[command](v);
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
        const match = s.match(this.regex());
        return match.slice(1, 4).join('');
    }

    private regex(): RegExp {
        const s = `(\/)(?:.*(${ this.keys().join('|') })(?:.*?((?:!=)|[<>=])([^!<>=\n]*))*)*`;
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
