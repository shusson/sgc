export class MockInitiative {

}

export class MockInitiativeService {
    getInitiative() {
        return Promise.resolve(new MockInitiative());
    }
    getInitiatives() {
        return Promise.resolve([new MockInitiative()]);
    }
}
