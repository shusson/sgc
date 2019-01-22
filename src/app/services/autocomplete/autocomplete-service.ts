
import { GenericAutocompleteResult } from '../../model/autocomplete-result';
import { Observable } from "rxjs";

export interface AutocompleteService<T> {
    search(query: string): Observable<GenericAutocompleteResult<T>[]>;
    getDetails(result: GenericAutocompleteResult<T>): Observable<T>;
}
