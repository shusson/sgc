describe('search', function () {
    beforeAll(function () {
        browser.get('/');
        browser.driver.manage().window().setSize(1201, 1000);
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        browser.get('https://sgc.au.auth0.com/v2/logout');
        browser.get('/');
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
        browser.get('/search');
    });

    afterAll(function () {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        browser.get('/');
    });

    beforeEach(function () {
        browser.get('/search');
    });

    afterEach(function () {
        browser.ignoreSynchronization = false;
    });

    it('should be able to find BRCA1', function () {
        var searchBar = element(by.css('input#search-query'));
        searchBar.isDisplayed().then(function () {
            searchBar.sendKeys("BRCA1");

            element(by.cssContainingText('.autocomplete-search-results .symbol', 'BRCA1')).isDisplayed().click();
            browser.ignoreSynchronization = true;
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(element(by.css('#gene_en_id'))), 5000);
            expect(element(by.css('#gene_en_id')).getText()).toEqual('ENSG00000012048');
        });
    });

    it('should be able to find API5P1', function () {
        var searchBar = element(by.css('input#search-query'));
        searchBar.isDisplayed().then(function () {
            searchBar.sendKeys("API5P1");

            element(by.cssContainingText('.autocomplete-search-results .symbol', 'API5P1')).isDisplayed().click();
            browser.ignoreSynchronization = true;
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(element(by.css('#gene_en_id'))), 5000);
            expect(element(by.css('#gene_en_id')).getText()).toEqual('ENSG00000234558');
        });
    });

    it('should be able to find BAD', function () {
        var searchBar = element(by.css('input#search-query'));
        searchBar.isDisplayed().then(function () {
            searchBar.sendKeys("BAD");

            element(by.cssContainingText('.autocomplete-search-results .symbol', 'BAD')).isDisplayed().click();
            browser.ignoreSynchronization = true;
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(element(by.css('#gene_en_id'))), 5000);
            expect(element(by.css('#gene_en_id')).getText()).toEqual('ENSG00000002330');
        });
    });

    it('should be able to find RP11-171I2.3', function () {
        var searchBar = element(by.css('input#search-query'));
        searchBar.isDisplayed().then(function () {
            searchBar.sendKeys("RP11-171I2.3");

            element(by.cssContainingText('.autocomplete-search-results .symbol', 'RP11-171I2.3')).isDisplayed().click();
            browser.ignoreSynchronization = true;
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(element(by.css('#gene_en_id'))), 5000);
            expect(element(by.css('#gene_en_id')).getText()).toEqual('ENSG00000271401');
        });
    });

    it('should be able to find ENSG00000157764', function () {
        var searchBar = element(by.css('input#search-query'));
        searchBar.isDisplayed().then(function () {
            searchBar.sendKeys("ENSG00000157764");

            element(by.cssContainingText('.autocomplete-search-results .symbol', 'BRAF')).isDisplayed().click();
            browser.ignoreSynchronization = true;
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(element(by.css('#gene_en_id'))), 5000);
            expect(element(by.css('#gene_en_id')).getText()).toEqual('ENSG00000157764');
        });
    });

    it('should be able to find X:100000-200000', function () {
        var searchBar = element(by.css('input#search-query'));
        searchBar.isDisplayed().then(function () {
            searchBar.sendKeys("X:0-100000");

            element(by.cssContainingText('.autocomplete-search-results .symbol', 'X:0-100000')).isDisplayed().click();
            browser.ignoreSynchronization = true;
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(element(by.css('#region_location_id'))), 5000);
            expect(element(by.css('#region_location_id')).getText()).toEqual('X:0-100000');
        });
    });

    it('should be able to find 2:0-100000', function () {
        var searchBar = element(by.css('input#search-query'));
        searchBar.isDisplayed().then(function () {
            searchBar.sendKeys("2:0-100000");

            element(by.cssContainingText('.autocomplete-search-results .symbol', '2:0-100000')).isDisplayed().click();
            browser.ignoreSynchronization = true;
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(element(by.css('#region_location_id'))), 5000);
            expect(element(by.css('#region_location_id')).getText()).toEqual('2:0-100000');
        });
    });
});
