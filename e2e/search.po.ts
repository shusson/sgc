import { browser, element, by, protractor } from 'protractor';

export class SearchPage {

    navigateTo() {
        browser.driver.manage().window().setSize(1201, 1000);
        browser.get('/search');
    }

    navigateToDemo() {
        browser.driver.manage().window().setSize(1201, 1000);
        return browser.get('/search/results;timestamp=1507169944564;demo=true;query=FAM110C');
    }

    search(v: string) {
        element(by.css('input#search-query')).sendKeys(v);
    }

    getAutocompleteResult(v: string) {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.cssContainingText('.search-results .symbol', v))), 5000);
        return element(by.cssContainingText('.search-results .symbol', v));
    }

    navigateToClinicalFiltering() {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.css('#md-tab-label-0-1'))), 5000);
        const g = element(by.css('#md-tab-label-0-1'));
        return g.click();
    }

    getClinicalFilteringBannerText() {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.css('.message.message-error'))), 5000);
        const g = element(by.css('.message.message-error'));
        return g.getText();
    }

    getDemoBannerText() {
        const g = element(by.css('.snack p'));
        return g.getText();
    }

    getClinicalFilteringCount() {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.css('.filter-count'))), 5000);
        const g = element(by.css('.filter-count'));
        return g.getText();
    }

    getGeneId(v: string) {
        const EC = protractor.ExpectedConditions;
        const g = element(by.css('#gene_en_id'));
        browser.wait(EC.visibilityOf(g), 5000);
        g.getText().then(t => {
            expect(t).toEqual(v);
        });
        return g;
    }

    getRegionId(v: string) {
        const EC = protractor.ExpectedConditions;
        const r = element(by.css('#region_location_id'));
        browser.wait(EC.visibilityOf(r), 5000);
        r.getText().then(t => {
            expect(t).toEqual(v);
        });
        return r;
    }
}
