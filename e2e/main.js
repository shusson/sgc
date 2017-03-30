'use strict';

describe('SGC', function () {

    it('should automatically redirect to /initiatives when location url is the root', function () {
        browser.get('');
        expect(browser.getCurrentUrl()).toMatch("/initiatives");
    });

    describe('navigation', function () {
        var EC = protractor.ExpectedConditions;
        describe('hamburger', function () {
            it('should be able to navigate to the initiatives page from the about page', function () {
                browser.driver.manage().window().setSize(500, 1000);
                browser.get('/about');
                element(by.css('.header-content i')).click().then(function () {
                    var link = element.all(by.css('md-sidenav nav')).all(by.cssContainingText('a', 'INITIATIVES')).first();
                    link.isDisplayed().then(function () {
                        browser.wait(EC.elementToBeClickable(link)).then(function () {
                            link.click();
                            expect(browser.getCurrentUrl()).toMatch("/initiatives");
                        });
                    });
                });
            });

            it('should be able to navigate to the about page from the initiative page', function () {
                browser.driver.manage().window().setSize(500, 1000);
                browser.get('/initiatives');
                element(by.css('.header-content i')).click().then(function () {
                    var link = element.all(by.css('md-sidenav nav')).all(by.cssContainingText('a', 'ABOUT')).first();
                    link.isDisplayed().then(function () {
                        browser.wait(EC.elementToBeClickable(link)).then(function () {
                            link.click();
                            expect(browser.getCurrentUrl()).toMatch("/about");
                        });
                    });

                });
            });
        });

        describe('navbar', function () {
            it('should be able to navigate to the initiatives page from the about page', function () {
                browser.driver.manage().window().setSize(1201, 1000);
                browser.get('/about');
                var link = element(by.linkText('INITIATIVES'));
                link.click().then(function () {
                    browser.wait(EC.elementToBeClickable(link)).then(function () {
                        expect(browser.getCurrentUrl()).toMatch("/initiatives");
                    });
                });
            });

            it('should be able to navigate to the about page from the initiative page', function () {
                browser.driver.manage().window().setSize(1201, 1000);
                browser.get('/initiatives');
                element(by.linkText('ABOUT')).click().then(function () {
                    element(by.css('.about')).isDisplayed().then(function () {
                        expect(browser.getCurrentUrl()).toMatch("/about");
                    });
                });
            });
        });
    });
});
