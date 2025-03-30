import { Region } from '../../model/region';
import { GenericAutocompleteResult } from '../../model/autocomplete-result';
import { RegionAutocomplete } from '../../model/region-autocomplete';
import { Injectable } from '@angular/core';
import { RegionService } from './region-service';
import { Position } from '../../model/position';
import { of, Observable } from "rxjs";

@Injectable()
export class PositionService extends RegionService {

    search(query: string): Observable<GenericAutocompleteResult<Region>[]> {
        const results = this.parseQuery(query.trim());
        if (results) {
            const chromosome = results[1];
            const start = Number(results[2]);
            const p = new Position(chromosome, start);
            const regions = [new RegionAutocomplete(p, p.name(), '', this)];
            return of<GenericAutocompleteResult<Region>[]>(regions);
        } else {
            return of<GenericAutocompleteResult<Region>[]>([]);
        }
    }

    protected parseQuery(query: string) {
        return RegExp(/^([\dxy]+|mt+)[:\-\.,\\/](\d+).*$/, "i").exec(query);
    }
}
