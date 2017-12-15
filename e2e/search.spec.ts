import { browser } from 'protractor';
import { TEST_BROWSER_WIDTH } from './main.spec';
import { User } from './user.po';
import { SearchPage } from './search.po';

describe('search', () => {
    const sp = new SearchPage();
    const user = new User();

    const searchGene = (v: string, expectedGene: string) => {
        sp.search(v);
        const r = sp.getAutocompleteResult(v);
        r.click();
        sp.getGeneId(expectedGene);
    };

    const searchRegion = (v: string) => {
        sp.search(v);
        const r = sp.getAutocompleteResult(v);
        r.click();
        sp.getRegionId(v);
    };

    beforeAll(() => {
        browser.driver.manage().window().setSize(TEST_BROWSER_WIDTH, 1000);
        user.logout();
        user.login();
    });

    afterAll(() => {
        user.logout();
    });

    beforeEach(() => {
        sp.navigateTo();
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
        const r = sp.getAutocompleteResult('BRAF');
        r.click();
        sp.getGeneId('ENSG00000157764');
    });

    it('should be able to find X:0-100000', () => {
        searchRegion('X:0-100000');
    });

    it('should be able to find 2:0-100000', () => {
        searchRegion('2:0-100000');
    });

    it('should show clinical filtering banner', () => {
        sp.search('BRCA1');
        const r = sp.getAutocompleteResult('BRCA1');
        r.click().then(() => {
            sp.navigateToClinicalFiltering().then(() => {
                sp.getClinicalFilteringBannerText().then((t) => {
                    expect(t).toEqual("You do not have permission to view this data. You can apply for access or view a demo.");
                });
            });
        });
    });

    it('should show clinical filtering demo', () => {
        sp.navigateToDemo().then(() => {
            sp.getDemoBannerText().then((t) => {
                expect(t).toEqual("Demo mode enabled. Data is for demonstrations purposes only.");
            });

            sp.getClinicalFilteringCount().then((t) => {
                expect(t).toEqual("1,139");
            });
        });
    });
});
