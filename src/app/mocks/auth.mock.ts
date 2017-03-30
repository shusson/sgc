
export class MockAuth {
    lock: any = {
        on: () => {},
    };

    login() {

    }

    authenticated() {
        return false;
    }
}
