import { AutocompleteService } from './autocomplete-service';
import { Region } from '../../model/region';
import { GenericAutocompleteResult } from '../../model/autocomplete-result';
import { RegionAutocomplete } from '../../model/region-autocomplete';
import { Injectable } from '@angular/core';
import { EnsemblService } from '../ensembl-service';
import { Gene } from '../../model/gene';
import { of, Observable } from "rxjs";

@Injectable()
export class RegionService implements AutocompleteService<Region> {

    constructor(protected ensemblService: EnsemblService) {
    }

    search(query: string): Observable<GenericAutocompleteResult<Region>[]> {
        const results = this.parseQuery(query.trim());
        if (results) {
            const chromosome = results[1];
            const start = Number(results[2]);
            const end = Number(results[3]);
            const r = new Region(chromosome, start, end);
            const regions = [new RegionAutocomplete(r, r.name(), '', this)];
            return of<GenericAutocompleteResult<Region>[]>(regions);
        } else {
            return of<GenericAutocompleteResult<Region>[]>([]);
        }
    }

    getDetails(autocomplete: GenericAutocompleteResult<Region>): Observable<Region> {
        return of(autocomplete.result);
    }

    getGenesInRegion(r: Region): Observable<Gene[]> {
        return this.ensemblService.getGenesInRegion(r.name())
            .map((data) => {
                return data.map((g: any) => {
                    g.symbol = g.external_name;
                    return g;
                });
            });
    }

    protected parseQuery(query: string) {
        return new RegExp(/^([\dxy]+|mt+)[:\-\.,\\/](\d+)[:\-\.,\\/](\d+)$/, "i").exec(query);
    }
}
