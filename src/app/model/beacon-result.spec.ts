

import { BeaconResult } from './beacon-result';

describe('BeaconResult', () => {

    it('is invalid when there no result or error', () => {
        let result: BeaconResult = new BeaconResult({});
        expect(result.isInvalid()).toBe(true);
        expect(result.isValid()).toBe(false);
    });

    it('is invalid when there no result and there is an error', () => {
        let result: BeaconResult = new BeaconResult({
            error: {'fred': 'fred'}
        });
        expect(result.isInvalid()).toBe(true);
        expect(result.isValid()).toBe(false);
    });

    it('is invalid when there is a result and there is an error', () => {
        let result: BeaconResult = new BeaconResult({
            exists: true,
            error: {'fred': 'fred'}
        });
        expect(result.isInvalid()).toBe(true);
        expect(result.isValid()).toBe(false);
    });

    it('is valid when there is a truthy result and there is no error', () => {
        let result: BeaconResult = new BeaconResult({
            exists: true,
            error: null
        });
        expect(result.isInvalid()).toBe(false);
        expect(result.isValid()).toBe(true);
    });

    it('is valid when there is a falsy result and there is no error', () => {
        let result: BeaconResult = new BeaconResult({
            exists: false,
            error: null
        });
        expect(result.isInvalid()).toBe(false);
        expect(result.isValid()).toBe(true);
    });


});
