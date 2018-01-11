import { Auth, expiredAtKey } from './auth-service';
import { MockRouter } from '../mocks/router.mock';

describe('Auth Service', () => {
    let authService: Auth;
    let mockRouter: any;

    beforeEach(() => {
        mockRouter = new MockRouter();
        authService = new Auth(mockRouter, null);
    });

    describe('authenticated', () => {
        it('should be expired', () => {
            localStorage.setItem(expiredAtKey, '');
            expect(authService.authenticated()).toBeFalsy();
        });

        it('should not be expired', () => {
            localStorage.setItem('expiredAtKey', (new Date().getTime() + 10000).toString());
            expect(authService.authenticated()).toBeFalsy();
            localStorage.setItem(expiredAtKey, '');
        });
    });
});
