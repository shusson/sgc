import { Observable } from 'rxjs/Observable';
import { Variant } from '../model/variant';
import { SearchQuery } from '../model/search-query';
import { Region } from '../model/region';

export class MockVariantSearchService {
    variants: Observable<any> = Observable.empty();
    results: Observable<any> = Observable.empty();
    updates: Observable<any> = Observable.empty();
    lastQuery: SearchQuery = new SearchQuery('1', 1, 2);
    options: any[] = [];

    getVariants() {
        return Promise.resolve([]);
    }

    currentResult(): Variant[] {
        return [];
    }

    getCurrentRegion() {
        return new Region('1', 1, 2);
    }

}
