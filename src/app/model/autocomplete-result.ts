import { Variant } from './variant';
import { VariantSearchService } from '../services/variant-search-service';
import { AutocompleteService } from '../services/autocomplete/autocomplete-service';
import { SearchOption } from './search-option';
import { Region } from './region';

export abstract class AutocompleteResult<T> {
    constructor(public result: T,
                public symbol: string,
                public description: string,
                public autocompleteService: AutocompleteService<T>) {

    };

    abstract search(vsal: VariantSearchService, options: SearchOption[]): Promise<Variant[]>;
    abstract region(): Promise<Region>;
    abstract displayName(): string;
    abstract categoryName(): string;
    abstract match(query: string): boolean;
}
