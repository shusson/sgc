import { browser, element, by, protractor } from 'protractor';
import { TEST_BROWSER_WIDTH } from './main.spec';

const TIMEOUT = 10000;

export class SearchPage {

    navigateTo() {
        browser.driver.manage().window().setSize(TEST_BROWSER_WIDTH, 1000);
        browser.get('/search');
    }

    navigateToDemo() {
        browser.driver.manage().window().setSize(TEST_BROWSER_WIDTH, 1000);
        return browser.get('/search/results;timestamp=1507169944564;demo=true;query=FAM110C');
    }

    search(v: string) {
        element(by.css('input#search-query')).sendKeys(v);
    }

    getAutocompleteResult(v: string) {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.cssContainingText('.search-results .symbol', v))), TIMEOUT);
        return element(by.cssContainingText('.search-results .symbol', v));
    }

    navigateToClinicalFiltering() {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.css('#mat-tab-label-0-1'))), TIMEOUT);
        const g = element(by.css('#mat-tab-label-0-1'));
        return g.click();
    }

    getClinicalFilteringBannerText() {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.css('.message.message-error'))), TIMEOUT);
        const g = element(by.css('.message.message-error'));
        return g.getText();
    }

    getDemoBannerText() {
        const g = element(by.css('.snack p'));
        return g.getText();
    }

    getClinicalFilteringCount() {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.css('.filter-count'))), TIMEOUT);
        const g = element(by.css('.filter-count'));
        return g.getText();
    }

    getGeneId(v: string) {
        const EC = protractor.ExpectedConditions;
        const g = element(by.css('#gene_en_id'));
        browser.wait(EC.visibilityOf(g), TIMEOUT);
        g.getText().then(t => {
            expect(t).toEqual(v);
        });
        return g;
    }

    getRegionId(v: string) {
        const EC = protractor.ExpectedConditions;
        const r = element(by.css('#region_location_id'));
        browser.wait(EC.visibilityOf(r), TIMEOUT);
        r.getText().then(t => {
            expect(t).toEqual(v);
        });
        return r;
    }
}
