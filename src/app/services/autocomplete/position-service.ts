import { Region } from '../../model/region';
import { GenericAutocompleteResult } from '../../model/autocomplete-result';
import { Observable } from 'rxjs/Observable';
import { RegionAutocomplete } from '../../model/region-autocomplete';
import { Injectable } from '@angular/core';
import { RegionService } from './region-service';
import { Position } from '../../model/position';

@Injectable()
export class PositionService extends RegionService {

    search(query: string): Observable<GenericAutocompleteResult<Region>[]> {
        let results = this.parseQuery(query.trim());
        if (results) {
            let chromosome = results[1];
            let start = Number(results[2]);
            let p = new Position(chromosome, start);
            let regions = [new RegionAutocomplete(p, p.name(), '', this)];
            return Observable.of<GenericAutocompleteResult<Region>[]>(regions);
        } else {
            return Observable.of<GenericAutocompleteResult<Region>[]>([]);
        }
    }

    protected parseQuery(query: string) {
        return /^([\dxXyY]+)[:\-\.,\\/](\d+).*$/.exec(query);
    }
}
