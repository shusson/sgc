import { browser, element, by } from 'protractor';

export class User {

    logout() {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        browser.waitForAngularEnabled(false);
        browser.get('https://sgc.au.auth0.com/v2/logout');
        browser.waitForAngularEnabled(true);
        browser.get('/');
    }

    login() {
        element(by.linkText('LOG IN')).click().then(() => {
            element(by.css('.auth0-lock-input-email input')).sendKeys("test@test.com");
            element(by.css('.auth0-lock-input-password input')).sendKeys("test");
            browser.driver.sleep(2000);
            browser.waitForAngularEnabled(false);
            element(by.css('button.auth0-lock-submit')).click();
            browser.driver.sleep(2000);
            browser.waitForAngularEnabled(true);
            expect(element(by.linkText('LOG OUT')).isDisplayed()).toBe(true);
        });
    }
}
