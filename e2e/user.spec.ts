import { User } from './user.po';
import { browser } from 'protractor';

describe('user', function () {

    const user = new User();

    beforeAll(() => {
        user.logout();
        browser.driver.manage().window().setSize(1201, 1000);
    });

    beforeEach(function () {

    });

    afterEach(function () {
        user.logout();
    });

    it('should be able to log in', function () {
        user.login();
    });

    it('should be able to log out', function () {
        user.login();
        user.logout();
    });
});
