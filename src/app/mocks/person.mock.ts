export class MockPerson {

}

export class MockPersonService {
    getCohort() {
        return Promise.resolve(new MockPerson());
    }
}
