export class MapdMock {
    session = {
        query: () => {
        }
    };

    connect() {
        return Promise.reject('');
    }
}
