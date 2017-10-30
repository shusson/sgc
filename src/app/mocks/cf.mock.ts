import { Subject } from 'rxjs/Subject';

export class CfMock {
    updates = new Subject();
    x = {
        dimension: () => {{}},
        getFilterString: () => '',
        getGlobalFilterString: () => '',
    };

    getFilterString() {
        return '';
    }

    create() {
        return Promise.reject('');
    }
}
