import { browser, element, by, protractor } from 'protractor';
import { TEST_BROWSER_WIDTH } from './main.spec';

export class ExplorePage {
    navigateTo() {
        browser.driver.manage().window().setSize(TEST_BROWSER_WIDTH, 1000);
        return browser.get('/explore');
    }

    verifyCount(count) {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.cssContainingText('.count .total-count', count))), 10000);
    }
}
