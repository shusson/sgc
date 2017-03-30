export class MockCohort {

}

export class MockCohortService {
    getCohort() {
        return Promise.resolve(new MockCohort());
    }
}
