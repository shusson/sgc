import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Gene } from '../../model/gene';
import { GenericAutocompleteResult } from '../../model/autocomplete-result';
import { GeneAutocomplete } from '../../model/gene-autocomplete';
import { AutocompleteService } from './autocomplete-service';
import { Chromosome } from '../../model/chromosome';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, throwError, Observable } from "rxjs";

const TIMEOUT = 5000;

@Injectable()
export class ElasticGeneSearch implements AutocompleteService<Gene> {

    constructor(private http: HttpClient) {
    }

    getChromosome(chromosome: string): Observable<Chromosome> {
        const headers = new HttpHeaders()
            .append('Accept', 'application/json');
        return this.http.get(`${ environment.elasticUrl }/chromosomes/chromosome/${chromosome.toUpperCase()}`, {headers: headers})
            .timeout(TIMEOUT)
            .catch(() => {
                return throwError('An error occurred while trying to connect to elasticsearch');
            })
            .map(data => {
                const source = data['_source'];
                const result = new Chromosome();
                result.name = source.id;
                result.length = source.length;
                return result;
            });
    }

    search(query: string): Observable<GenericAutocompleteResult<Gene>[]> {
        const headers = new HttpHeaders()
            .append('Accept', 'application/json');
        const body = {
            'from': 0, 'size': 5,
            'query': {
                'dis_max': {
                    'queries': [
                        {
                            'match': {
                                'id': {
                                    'query': `${ query }`,
                                },
                            },
                        },
                        {
                            'match_phrase_prefix': {
                                'symbol': {
                                    'query': `${ query }`,
                                    'max_expansions': 20,
                                    'boost': 2
                                },
                            },
                        },
                        {
                            'match': {
                                'symbol': {
                                    'query': `${ query }`,
                                    'fuzziness': 1,
                                    'boost': 2
                                },
                            },
                        },
                        {
                            'match': {
                                'description': {
                                    'query': `${ query }`,
                                    'fuzziness': 1,
                                },
                            }
                        }
                    ],
                    'tie_breaker': 0.4
                }
            },
            'sort': [
                {'_score': {'order': 'desc'}},
            ]
        };
        return this.http.post(environment.elasticUrl + '/_search', body, {headers: headers})
            .timeout(TIMEOUT)
            .catch(() => {
                return throwError('An error occurred while trying to connect to elasticsearch');
            })
            .map((data: any) => {
                return data.hits.hits.map((j: any) => {
                    const g = new Gene();
                    const source = j._source;
                    g.id = source.id;
                    g.name = source.description;
                    g.symbol = source.symbol;
                    g.chromosome = source.chromosome;
                    g.start = source.start;
                    g.end = source.end;
                    return new GeneAutocomplete(g, g.id, g.name, this);
                });
            });
    }

    getDetails(gene: GeneAutocomplete): Observable<Gene> {
        return of<Gene>(gene.result);
    }
}
