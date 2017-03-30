import { Observable } from 'rxjs';

export class MockSearchBarService {
    searchedEvent = Observable.empty();
    reset() {}
}
