import { Variant } from './variant';
import { GenericAutocompleteResult } from './autocomplete-result';
import { VariantSearchService } from '../services/variant-search-service';
import { Region } from './region';
import { SearchOption } from './search-option';
import { SearchQuery } from './search-query';
import { Position } from './position';

export class RegionAutocomplete extends GenericAutocompleteResult<Region> {
    search(vsal: VariantSearchService, options: SearchOption[]): Promise<Variant[]> {
        return vsal.getVariants(new SearchQuery(this.result.chromosome, this.result.start, this.result.end, options));
    }

    region(): Promise<Region> {
        return Promise.resolve(new Region(this.result.chromosome, this.result.start, this.result.end));
    }

    displayName(): string {
        return this.symbol;
    }

    categoryName() {
        return this.result instanceof Position ? 'Position' : 'Region';
    }

    match(query: string) {
        let queryTrimmed = query.trim();
        return this.symbol === queryTrimmed;
    }
}
