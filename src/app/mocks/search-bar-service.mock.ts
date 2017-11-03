import { Observable } from 'rxjs/Observable';

export class MockSearchBarService {
    searchedEvent = Observable.empty();
    reset() {}
}
