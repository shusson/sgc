import { Subject } from 'rxjs/Subject';

export class CfMock {
    updates = new Subject();

    create() {
        return Promise.reject('');
    }
}
