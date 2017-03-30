import { SearchOption } from './search-option';

export class SearchQuery {
    constructor(public chromosome: string,
                public start: number,
                public end: number,
                public options: SearchOption[]) {
    }
}
