import { browser } from 'protractor';
import { ExplorePage } from './explore.po';
import { TEST_BROWSER_WIDTH } from './main.spec';
import { User } from './user.po';


describe('Explore Page', () => {
    const explore = new ExplorePage();
    const user = new User();

    beforeAll(() => {
        browser.driver.manage().window().setSize(TEST_BROWSER_WIDTH, 1000);
        user.logout();
        user.login();
    });

    afterAll(() => {
        user.logout();
    });

    beforeEach(() => {
        explore.navigateTo();
    });

    it('should display a total count of 83722121', function () {
        explore.verifyCount('83722121')
    });
});
