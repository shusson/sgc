describe('initiatives', function () {
    beforeEach(function () {
        browser.driver.manage().window().setSize(1201, 1000);
        browser.get('/initiatives');
    });

    it('should display a navigation bar with 7 links', function () {
        expect(element(by.css('nav')).all(by.tagName('a')).count()).toEqual(7);
    });

    it('should display 3 initiatives', function () {
        expect(element.all(by.tagName('app-program-card')).count()).toEqual(3);
    });

    it('should display a totals widget with some text', function () {
        expect(element.all(by.tagName('app-totals-widget')).count()).toEqual(1);

        var textLength = element(by.tagName('app-totals-widget')).getText()
            .then(function (text) {
                return text.length;
            });

        expect(textLength).toBeGreaterThan(10);
    });
});
