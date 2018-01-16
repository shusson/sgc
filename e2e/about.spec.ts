import { AboutPage } from './about.po';

describe('About Page', () => {
    let page: AboutPage;

    beforeEach(() => {
        page = new AboutPage();
        page.navigateTo();
    });

    it('should display a navigation bar with 8 links', function () {
        page.getNavBar().count().then( v => {
            expect(v).toEqual(8)
        });
    });

    it('should display 1 articles with some text', function () {
        page.getArticle().count().then(v => {
            expect(v).toEqual(1);
            page.getArticle().then((a) => {
                a[0].getText().then((text: string) => {
                    expect(text.length).toBeGreaterThan(10);
                });
            });
        });
    });
});
