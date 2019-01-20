import { empty } from "rxjs";

export class MockSearchBarService {
    searchedEvent = empty();
    reset() {}
}
