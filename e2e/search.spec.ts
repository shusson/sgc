import { browser, by, element, protractor } from 'protractor';
import { User } from './user.po';
import { SearchPage } from './search.po';

describe('search', () => {
    let sp = new SearchPage();
    let user = new User();

    let searchGene = (v: string, expectedGene: string) => {
        sp.search(v);
        let r = sp.getAutocompleteResult(v);
        r.click();
        sp.getGeneId(expectedGene);
    };

    let searchRegion = (v: string) => {
        sp.search(v);
        let r = sp.getAutocompleteResult(v);
        r.click();
        sp.getRegionId(v);
    };

    beforeAll(() => {
        browser.driver.manage().window().setSize(1201, 1000);
        user.logout();
        user.login();
    });

    afterAll(() => {
        user.logout();
    });

    beforeEach(() => {
        sp.navigateTo();
        browser.waitForAngularEnabled(false);
    });

    afterEach(() => {
        browser.waitForAngularEnabled(true);
    });

    it('should be able to find BRCA1', () => {
        searchGene('BRCA1', 'ENSG00000012048');
    });

    it('should be able to find API5P1', () => {
        searchGene('API5P1', 'ENSG00000234558');
    });

    it('should be able to find BAD', () => {
        searchGene('BAD', 'ENSG00000002330');
    });

    it('should be able to find RP11-171I2.3', () => {
        searchGene('RP11-171I2.3', 'ENSG00000271401');
    });

    it('should be able to find ENSG00000157764', () => {
        sp.search('ENSG00000157764');
        let r = sp.getAutocompleteResult('BRAF');
        r.click();
        sp.getGeneId('ENSG00000157764');
    });

    it('should be able to find X:0-100000', () => {
        searchRegion('X:0-100000');
    });

    it('should be able to find 2:0-100000', () => {
        searchRegion('2:0-100000');
    });
});
