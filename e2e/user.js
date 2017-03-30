describe('user', function () {
    beforeEach(function () {
        browser.get('/');
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        browser.get('/');
        browser.get('https://sgc.au.auth0.com/v2/logout');
        browser.get('/');
    });

    afterEach(function () {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    it('should be able to log in', function () {
        browser.driver.manage().window().setSize(1201, 1000);
        element(by.linkText('LOG IN')).click().then(function () {
            var lockLoginLogo = element(by.css('.auth0-lock-page-container-welcome'));
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(lockLoginLogo), 1000);
            lockLoginLogo.isDisplayed().then(function () {
                browser.wait(EC.visibilityOf(lockLoginLogo), 1000);
                expect(element(by.css('.auth0-lock-page-container-welcome')).isDisplayed()).toBe(true);
                expect(element(by.css('.auth0-lock-input-email input')).isDisplayed()).toBe(true);
                expect(element(by.css('.auth0-lock-input-password input')).isDisplayed()).toBe(true);
                element(by.css('.auth0-lock-input-email input')).sendKeys("test@test.com");
                element(by.css('.auth0-lock-input-password input')).sendKeys("test");
                element(by.css('button.auth0-lock-submit')).click();
            });

            expect(element(by.linkText('LOG OUT')).isDisplayed()).toBe(true);
        });
    });

    it('should be able to log out', function () {
        browser.driver.manage().window().setSize(1201, 1000);
        element(by.linkText('LOG IN')).click().then(function () {
            var lockLoginLogo = element(by.css('.auth0-lock-page-container-welcome'));
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(lockLoginLogo), 1000);
            lockLoginLogo.isDisplayed().then(function () {
                browser.wait(EC.visibilityOf(lockLoginLogo), 1000);
                expect(element(by.css('.auth0-lock-page-container-welcome')).isDisplayed()).toBe(true);
                expect(element(by.css('.auth0-lock-input-email input')).isDisplayed()).toBe(true);
                expect(element(by.css('.auth0-lock-input-password input')).isDisplayed()).toBe(true);
                element(by.css('.auth0-lock-input-email input')).sendKeys("test@test.com");
                element(by.css('.auth0-lock-input-password input')).sendKeys("test");
                element(by.css('button.auth0-lock-submit')).click();
            });

            element(by.linkText('LOG OUT')).isDisplayed().then(function () {
                element(by.linkText('LOG OUT')).click().then(function () {
                    expect(element(by.linkText('LOG IN')).isDisplayed()).toBe(true);
                });
            });
        });
    });
});
