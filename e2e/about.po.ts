import { browser, element, by } from 'protractor';
import { TEST_BROWSER_WIDTH } from './main.spec';

export class AboutPage {
    navigateTo() {
        browser.driver.manage().window().setSize(TEST_BROWSER_WIDTH, 1000);
        return browser.get('/about');
    }

    getNavBar() {
        return element(by.css('nav')).all(by.tagName('a'));
    }

    getArticle() {
        return element.all(by.tagName('article'));
    }
}
