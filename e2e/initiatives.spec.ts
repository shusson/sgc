import { browser, by, element } from 'protractor';
import { TEST_BROWSER_WIDTH } from './main.spec';

describe('initiatives', function () {
    beforeEach(function () {
        browser.driver.manage().window().setSize(TEST_BROWSER_WIDTH, 1000);
        browser.get('/initiatives');
    });

    it('should display a navigation bar with 8 links', function () {
        element(by.css('nav')).all(by.tagName('a')).count().then(v => {
            expect(v).toEqual(8);
        })

    });

    it('should display 3 initiatives', function () {
        element.all(by.tagName('app-program-card')).count().then(v => {
            expect(v).toEqual(3);
        });
    });

    it('should display a totals widget with some text', function () {
        element.all(by.tagName('app-totals-widget')).count().then(v => {
            expect(v).toEqual(1);
            element(by.tagName('app-totals-widget')).getText()
                .then(function (text) {
                    expect(text.length).toBeGreaterThan(10);
                });
        });
    });
});
