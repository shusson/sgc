import { browser, element, by, protractor } from 'protractor';

export class SearchPage {

    navigateTo() {
        browser.get('/search');
    }

    search(v: string) {
        element(by.css('input#search-query')).sendKeys(v);
    }

    getAutocompleteResult(v: string) {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.cssContainingText('.search-results .symbol', v))), 5000);
        return element(by.cssContainingText('.search-results .symbol', v));
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
