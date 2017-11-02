import { Observable } from 'rxjs/Observable';
import { AutocompleteResult } from '../../model/autocomplete-result';

export interface AutocompleteService<T> {
    search(query: string): Observable<AutocompleteResult<T>[]>;
    getDetails(result: AutocompleteResult<T>): Observable<T>;
}
