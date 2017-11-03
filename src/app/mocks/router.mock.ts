
import { Observable } from 'rxjs/Observable';

export class MockRouter {
    events = Observable.empty();
    createUrlTree() {}
    serializeUrl() {}
}
