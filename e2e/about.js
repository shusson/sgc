describe('about', function () {
    beforeEach(function () {
        browser.driver.manage().window().setSize(1201, 1000);
        browser.get('/about');
    });

    it('should display a navigation bar with 7 links', function () {
        expect(element(by.css('nav')).all(by.tagName('a')).count()).toEqual(7);
    });

    it('should display 1 articles with some text', function () {
        expect(element.all(by.tagName('article')).count()).toEqual(1);
        element.all(by.tagName('article')).each(function (element) {
            element.getText().then(function (text) {
                expect(text.length).toBeGreaterThan(10);
            });
        });
    });
});