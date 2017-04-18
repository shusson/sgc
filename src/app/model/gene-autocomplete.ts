
import { Variant } from './variant';
import { AutocompleteResult } from './autocomplete-result';
import { Gene } from './gene';
import { VariantSearchService } from '../services/variant-search-service';
import { SearchOption } from './search-option';
import { SearchQuery } from './search-query';
import { SearchFilterItem } from './search-filter-item';

export class GeneAutocomplete extends AutocompleteResult<Gene> {

    search(vsal: VariantSearchService, options: SearchOption[], clinicalFilters: SearchFilterItem[]): Promise<Variant[]> {
        return this.autocompleteService.getDetails(this).toPromise().then((gene: Gene) => {
            return vsal.getVariants(new SearchQuery(gene.chromosome, gene.start, gene.end, options, clinicalFilters));
        }).catch(e => e);
    }

    displayName() {
        return this.result.symbol;
    }

    categoryName() {
        return 'Gene';
    }

    match(query: string) {
        let queryTrimmed = new RegExp(query.trim(), 'i');
        return queryTrimmed.exec(this.symbol) !== null || queryTrimmed.exec(this.result.symbol) !== null;
    }
}
