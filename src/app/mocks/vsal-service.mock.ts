import { Observable } from 'rxjs/Observable';
import { VariantRequest } from '../model/variant-request';

export class MockVsalService {
    error = '';
    expectedVariants: any;

    constructor(expectedVariants: any) {
        this.expectedVariants = expectedVariants;
    }

    setError(error: string) {
        this.error = error;
    }

    getVariants() {
        if (this.error) {
            return Observable.throw(this.error);
        }
        return Observable.of<VariantRequest>(new VariantRequest(this.expectedVariants, ''));
    }
}
