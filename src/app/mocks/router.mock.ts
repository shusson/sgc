
import { empty } from "rxjs";

export class MockRouter {
    events = empty();
    createUrlTree() {}
    serializeUrl() {}
}
