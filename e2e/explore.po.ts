import { browser, element, by, protractor } from 'protractor';

export class ExplorePage {
    navigateTo() {
        browser.driver.manage().window().setSize(1201, 1000);
        return browser.get('/explore');
    }

    verifyCount(count) {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.cssContainingText('.count .total-count', count))), 10000);
    }
}
