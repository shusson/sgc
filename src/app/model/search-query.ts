import { SearchOption } from './search-option';
import { SearchFilterItemSerialised } from './search-filter-item';

export class SearchQuery {
    constructor(public chromosome: string,
                public start: number,
                public end: number,
                public options: SearchOption[],
                public clinicalFilters: SearchFilterItemSerialised[] = []) {
    }
}
