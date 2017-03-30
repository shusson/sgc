import { AutocompleteService } from './autocomplete-service';
import { Region } from '../../model/region';
import { AutocompleteResult } from '../../model/autocomplete-result';
import { Observable } from 'rxjs';
import { RegionAutocomplete } from '../../model/region-autocomplete';
import { Injectable } from '@angular/core';
import { EnsemblService } from '../ensembl-service';
import { Gene } from '../../model/gene';

@Injectable()
export class RegionService implements AutocompleteService<Region> {

    constructor(protected ensemblService: EnsemblService) {
    }

    search(query: string): Observable<AutocompleteResult<Region>[]> {
        let results = this.parseQuery(query.trim());
        if (results) {
            let chromosome = results[1];
            let start = Number(results[2]);
            let end = Number(results[3]);
            if (start > end) {
                return Observable.throw(new Error('Start position cannot be greater than end'));
            }
            let r = new Region(chromosome, start, end);
            let regions = [new RegionAutocomplete(r, r.name(), '', this)];
            return Observable.of<AutocompleteResult<Region>[]>(regions);
        } else {
            return Observable.of<AutocompleteResult<Region>[]>([]);
        }
    }

    getDetails(autocomplete: AutocompleteResult<Region>): Observable<Region> {
        return Observable.of(autocomplete.result);
    }

    getGenesInRegion(r: Region): Observable<Gene[]> {
        return this.ensemblService.getGenesInRegion(r.name())
            .map((response) => {
                if (response.ok) {
                    return response.json().map((g: any) => {
                        g.symbol = g.external_name;
                        return g;
                    });
                }
            });
    }

    protected parseQuery(query: string) {
        return /^([\dxXyY]+)[:\-\.,\\/](\d+)[:\-\.,\\/](\d+)$/.exec(query);
    }
}
