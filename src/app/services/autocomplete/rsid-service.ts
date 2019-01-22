import { AutocompleteService } from './autocomplete-service';
import { GenericAutocompleteResult } from '../../model/autocomplete-result';
import { Injectable } from '@angular/core';
import { Rsid } from '../../model/rsid';
import { RsidAutocomplete } from '../../model/rsid-autocomplete';
import { of, Observable } from "rxjs";

@Injectable()
export class RsidService implements AutocompleteService<Rsid> {

    constructor() {};

    search(query: string): Observable<GenericAutocompleteResult<Rsid>[]> {
        const results = this.parseQuery(query.trim());
        if (results) {
            const rsids = [new RsidAutocomplete(new Rsid(results[0]), results[0], '', this)];
            return of<GenericAutocompleteResult<Rsid>[]>(rsids);
        } else {
            return of<GenericAutocompleteResult<Rsid>[]>([]);
        }
    }

    getDetails(autocomplete: GenericAutocompleteResult<Rsid>): Observable<Rsid> {
        return of(autocomplete.result);
    }

    protected parseQuery(query: string) {
        return /^(rs|ss)(\d+)$/i.exec(query);
    }
}
