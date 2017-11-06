import { AutocompleteService } from './autocomplete-service';
import { GenericAutocompleteResult } from '../../model/autocomplete-result';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Rsid } from '../../model/rsid';
import { RsidAutocomplete } from '../../model/rsid-autocomplete';

@Injectable()
export class RsidService implements AutocompleteService<Rsid> {

    constructor() {};

    search(query: string): Observable<GenericAutocompleteResult<Rsid>[]> {
        const results = this.parseQuery(query.trim());
        if (results) {
            const rsids = [new RsidAutocomplete(new Rsid(results[0]), results[0], '', this)];
            return Observable.of<GenericAutocompleteResult<Rsid>[]>(rsids);
        } else {
            return Observable.of<GenericAutocompleteResult<Rsid>[]>([]);
        }
    }

    getDetails(autocomplete: GenericAutocompleteResult<Rsid>): Observable<Rsid> {
        return Observable.of(autocomplete.result);
    }

    protected parseQuery(query: string) {
        return /^(rs|ss)(\d+)$/i.exec(query);
    }
}
