import { VariantRequest } from '../model/variant-request';
import { of, throwError } from "rxjs";

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
            return throwError(this.error);
        }
        return of<VariantRequest>(new VariantRequest(this.expectedVariants, ''));
    }
}
