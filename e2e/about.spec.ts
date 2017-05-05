import { AboutPage } from './about.po';

describe('About Page', () => {
    let page: AboutPage;

    beforeEach(() => {
        page = new AboutPage();
        page.navigateTo();
    });

    it('should display a navigation bar with 6 links', function () {
        expect(page.getNavBar().count()).toEqual(6);
    });

    it('should display 1 articles with some text', function () {
        expect(page.getArticle().count()).toEqual(1);
        page.getArticle().then((a) => {
            a[0].getText().then((text: string) => {
                expect(text.length).toBeGreaterThan(10);
            });
        });
    });
});
