
import { Observable } from 'rxjs';

export class MockRouter {
    events = Observable.empty();
    createUrlTree() {}
    serializeUrl() {}
}
