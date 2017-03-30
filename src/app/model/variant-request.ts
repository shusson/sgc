import { Variant } from './variant';

export class VariantRequest {
    constructor(public variants: Variant[], public error: string = '', public total: number = null) {}
}
