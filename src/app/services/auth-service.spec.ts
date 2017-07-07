import { Auth } from './auth-service';
import { constants } from '../app.constants';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

class MockRouter {
    events = Observable.empty();
}

class MockLock {
    shown = false;
    show() {
        this.shown = true;
    }

    on() {}
}
describe('Auth Service', () => {
    let authService: Auth;
    let mockLock: any;
    let mockRouter: any;
    let mockTokenFnCalled: any;
    let mockTokenFn: any;
    let mockLocation: any;

    beforeEach(() => {
        mockTokenFnCalled = false;
        mockTokenFn = () => {
            mockTokenFnCalled = true;
        };
        mockLock = new MockLock();
        mockRouter = new MockRouter();
        mockLocation = {href: ''};
        authService = new Auth(mockRouter, null, mockTokenFn, mockLocation, mockLock);
    });

    describe('login', () => {
        it('should show the lock', () => {
            expect(mockLock.shown).toBeFalsy();
            authService.login();
            expect(mockLock.shown).toBeTruthy();
        });
    });

    describe('authenticated', () => {
        it('should call the token authentication function', () => {
            expect(mockTokenFnCalled).toBeFalsy();
            authService.authenticated();
            expect(mockTokenFnCalled).toBeTruthy();
        });
    });

    describe('logout', () => {
        it('should remove the id token from local storage', () => {
            localStorage.setItem('id_token', 'fred');
            expect(localStorage.getItem('id_token')).toBeTruthy();
            authService.logout();
            expect(localStorage.getItem('id_token')).toBeFalsy();
        });

        it('should set the browser url to the logout url', () => {
            let expectedHref = `https://${ environment.auth0Domain }/v2/logout?returnTo=${ constants.ORIGIN_URL }`;
            expect(mockLocation.href).toEqual('');
            authService.logout();
            expect(mockLocation.href).toEqual(expectedHref);
        });
    });
});
