export class BeaconResult {
    error: string;
    result: boolean;
    name = '';
    org = '';

    constructor(data: any) {
        this.result = data.exists;
        this.error = data.error;
    }

    isValid() {
        return this.result != null && this.error == null;
    }

    isInvalid() {
        return !this.isValid();
    }
}
