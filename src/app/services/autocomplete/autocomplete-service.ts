import { Observable } from 'rxjs/Observable';
import { GenericAutocompleteResult } from '../../model/autocomplete-result';

export interface AutocompleteService<T> {
    search(query: string): Observable<GenericAutocompleteResult<T>[]>;
    getDetails(result: GenericAutocompleteResult<T>): Observable<T>;
}
