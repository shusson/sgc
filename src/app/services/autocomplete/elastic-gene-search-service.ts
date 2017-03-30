import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Gene } from '../../model/gene';
import { AutocompleteResult } from '../../model/autocomplete-result';
import { Observable } from 'rxjs';
import { GeneAutocomplete } from '../../model/gene-autocomplete';
import { AutocompleteService } from './autocomplete-service';
import { Chromosome } from '../../model/chromosome';

const TIMEOUT = 2000;

@Injectable()
export class ElasticGeneSearch implements AutocompleteService<Gene> {

    constructor(private http: Http) {
    }

    getChromosome(chromosome: string): Observable<Chromosome> {
        let urlParams = new URLSearchParams();
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = {search: urlParams, headers: headers};
        return this.http.get(`${ environment.elasticUrl }/chromosomes/chromosome/${chromosome}`, options)
            .timeout(TIMEOUT)
            .catch(() => {
                return Observable.throw('An error occurred while trying to connect to elasticsearch');
            })
            .map((response: Response) => {
                if (response.ok) {
                    let source = response.json()._source;
                    let result = new Chromosome();
                    result.name = source.id;
                    result.length = source.length;
                    return result;
                } else {
                    return Observable.throw('Failed to get chromosome' + chromosome);
                }
            });
    }

    search(query: string): Observable<AutocompleteResult<Gene>[]> {
        let urlParams = new URLSearchParams();
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let body = {
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
                {'concrete': {'order': 'asc'}}
            ]
        };
        let options = {search: urlParams, headers: headers};
        return this.http.post(environment.elasticUrl + '/_search', body, options)
            .timeout(TIMEOUT)
            .catch(() => {
                return Observable.throw('An error occurred while trying to connect to elasticsearch');
            })
            .map((response: Response) => {
                if (response.ok) {
                    return response.json().hits.hits.map((j: any) => {
                        let g = new Gene();
                        let source = j._source;
                        g.id = source.id;
                        g.name = source.description;
                        g.symbol = source.symbol;
                        g.chromosome = source.chromosome;
                        g.start = source.start;
                        g.end = source.end;
                        return new GeneAutocomplete(g, g.id, g.name, this);
                    });
                } else {
                    return Observable.throw('Failed to get gene search results for query:' + query);
                }
            });
    }

    getDetails(gene: GeneAutocomplete): Observable<Gene> {
        return Observable.of<Gene>(gene.result);
    }
}
