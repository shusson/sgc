import { GenericAutocompleteResult } from './autocomplete-result';
import { Rsid } from './rsid';

export class RsidAutocomplete extends GenericAutocompleteResult<Rsid> {

    displayName(): string {
        return this.symbol;
    }

    categoryName() {
        return 'RSID';
    }

    match(query: string) {
        return this.symbol === query.trim();
    }
}
